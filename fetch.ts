import {
	Address,
	BigInt,
} from '@graphprotocol/graph-ts'

import {
	fetchAccount
} from '@openzeppelin/subgraphs/src/fetch/account'

import {
	EIP4824ProposalStatus, EIP4824Proposal, EIP4824Member, EIP4824DAO, EIP4824Activity, EIP4824Support, EIP4824Weight
} from '../eip-4824/schema'


export function fetchEIP4824DAO(address: Address): EIP4824DAO {

	let account = fetchAccount(address);
	let dao = EIP4824DAO.load(account.id);

	if(dao == null) {
		dao = new EIP4824DAO(account.id,"dao");
		dao.save();
	}

	return dao as EIP4824DAO;

}

export function fetchEIP4824Proposal(proposalId: string): EIP4824Proposal {

	let proposal = EIP4824Proposal.load(proposalId);

	if (proposal == null) {

		proposal = new EIP4824Proposal(proposalId);
		proposal.save();
	}

	return proposal as EIP4824Proposal;
}

export function fetchEIP4824ProposalStatus(proposalId: string, type: string): EIP4824ProposalStatus {
	// let account  = fetchAccount(address)
	let status = EIP4824ProposalStatus.load(proposalId)

	if (status == null) {
		status           = new EIP4824ProposalStatus(proposalId, type)
		status.save()
	}

    return status as EIP4824ProposalStatus;
}

// export function fetchEIP4824Proposer(address: string, type: string, proposalId: string): EIP4824Proposer {

// 	let member = EIP4824Proposer.load(proposalId)

// 	if (member == null) {
// 		member           = new EIP4824Proposer(address, type, proposalId);
// 		member.save()
// 	}

// 	return member as EIP4824Proposer;
// }

export function fetchEIP4824Activity(voter: string, proposalId: string) : EIP4824Activity {

	let voteId = proposalId.concat('/').concat(voter.toString())

	let activity = EIP4824Activity.load(voteId);

	if (activity ==  null) {
			activity     = new EIP4824Activity(voteId);
			activity.voter = voter;
			activity.proposal = proposalId;
			activity.save();
	}

	return activity as EIP4824Activity;
}


export function fetchEIP4824Support(voteId: string, type: string) : EIP4824Support {

	let result = EIP4824Support.load(voteId);

	if (result ==  null) {
			result     = new EIP4824Support(voteId);
			result.type = type;
			result.save();
	}

	return result as EIP4824Support;
}

export function fetchEIP4824Weight(voteId: string) : EIP4824Weight {

	let result = EIP4824Weight.load(voteId);

	if (result ==  null) {
			result     = new EIP4824Weight(voteId);
			result.save();
	}

	return result as EIP4824Weight;
}

export function fetchEIP4824Member(id: string) : EIP4824Member {

	let result = EIP4824Member.load(id);

	if (result ==  null) {
		result     = new EIP4824Member(id);
		result.save();
	}

	return result as EIP4824Member	
}