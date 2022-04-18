

import {
	Bytes,
} from '@graphprotocol/graph-ts'

import {
	ProposalCreated,
	ProposalQueued,
	ProposalExecuted,
	ProposalCanceled,
	VoteCast,
} from '@openzeppelin/subgraphs/generated/schema'

import {
	Governor         as GovernorContract,
	ProposalCreated  as ProposalCreatedEvent,
	ProposalQueued   as ProposalQueuedEvent,
	ProposalExecuted as ProposalExecutedEvent,
	ProposalCanceled as ProposalCanceledEvent,
	VoteCast         as VoteCastEvent,
} from '@openzeppelin/subgraphs/generated/governor/Governor'

// import {
// 	fetchAccount
// } from '@openzeppelin/subgraphs/src/fetch/account'

import {
	EIP4824DAO,
	EIP4824Proposal,
	EIP4824ProposalStatus,
	EIP4824Member,
	EIP4824Activity

} from './schema'

import {
	constants,
	decimals,
	events,
	transactions,
} from '@amxx/graphprotocol-utils'


import {

	fetchEIP4824Proposal,
	fetchEIP4824ProposalStatus,
	fetchEIP4824Activity,
	fetchEIP4824Support,
	fetchEIP4824Weight,
	fetchEIP4824Member

} from './fetch'

import { PRDaoEvent } from '../prdao/schema'

const network = "ethereum";
const chainId = "5"


export function handleProposalCreated(event: ProposalCreatedEvent): void {

	let proposalId = event.params.proposalId.toString();

	let account = fetchEIP4824Member(event.address.toHexString());

	let daoId = network.concat("/").concat(chainId).concat("/").concat(account.id);
	let dao 		 	 = new EIP4824DAO(daoId, "dao")
	dao.address = account.id;
	dao.network = network;
	dao.chainId = chainId;
	dao.save();

	let status 			 = new EIP4824ProposalStatus(proposalId,"prdao:openZeppelinStatus");
	status.canceled = false;
	status.executed = false;
	status.queued = false;
	status.save();

	let proposer = new EIP4824Member(event.params.proposer.toHexString());
	proposer.role = "proposer";
	proposer.type = network.concat(":").concat(chainId);
	proposer.proposalId = proposalId;
	proposer.save();

	let proposal         = new EIP4824Proposal(proposalId);
	proposal.name = event.params.description;
	proposal.dao = daoId;
	proposal.status = status.id;
	proposal.proposer = proposer.id;
	proposal.contentURI = "";
    proposal.contentText = "";
    proposal.startBlock = event.params.startBlock;
    proposal.endBlock = event.params.endBlock;
	proposal.save();

	let ev         = new PRDaoEvent(proposalId,"ProposalCreated");
	ev.transaction = transactions.log(event).id;
	ev.timestamp   = event.block.timestamp;
	ev.save();

}

export function handleProposalQueued(event: ProposalQueuedEvent): void {

	let proposalId = event.params.proposalId.toString();

	let status    = fetchEIP4824ProposalStatus(proposalId,"prdao:openZeppelinStatus")
	status.queued = true
	status.save();

	let ev         = new PRDaoEvent(proposalId,"ProposalQueued");
	ev.transaction = transactions.log(event).id;
	ev.timestamp   = event.block.timestamp;
	ev.save();
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {

	let proposalId = event.params.proposalId.toString();

	let status    = fetchEIP4824ProposalStatus(proposalId,"prdao:openZeppelinStatus")
	status.executed = true
	status.save()

	let ev         = new PRDaoEvent(proposalId,"ProposalExecuted");
	ev.transaction = transactions.log(event).id;
	ev.timestamp   = event.block.timestamp;
	ev.save();
}

export function handleProposalCanceled(event: ProposalCanceledEvent): void {

	let proposalId = event.params.proposalId.toString();

	let status    = fetchEIP4824ProposalStatus(proposalId,"prdao:openZeppelinStatus")
	status.canceled = true
	status.save()

	let ev         = new PRDaoEvent(proposalId,"ProposalCanceled");
	ev.transaction = transactions.log(event).id;
	ev.timestamp   = event.block.timestamp;
	ev.save();

}

export function handleVoteCast(event: VoteCastEvent): void {
	

	let proposalId = event.params.proposalId.toString();
	let proposal = fetchEIP4824Proposal(proposalId);

	let voter = fetchEIP4824Member(event.params.voter.toHexString()); 

	let activity = fetchEIP4824Activity(voter.id, proposalId);
	
	let support = fetchEIP4824Support(activity.id,"prdao:openZeppelinSupport");
	support.value = event.params.support;
	support.save();

	let weight = fetchEIP4824Weight(activity.id);
	weight.type = "prdao:openZeppelinWeight";
	weight.value = event.params.weight.toI32();
	weight.save();

	activity.interactionType = "vote";
	activity.timestamp = event.block.timestamp;
	activity.transaction = transactions.log(event).id;
	activity.proposal = proposalId;
	activity.weight = weight.id;
	activity.support = support.id;
	activity.save();
}
