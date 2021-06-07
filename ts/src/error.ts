export class IdlError extends Error {}

// An error from a user defined program.
export class ProgramError extends Error {
  constructor(readonly code: number, readonly msg: string, ...params: any[]) {
    super(...params);
  }

  public toString(): string {
    return this.msg;
  }
}

const ErrorCode = {
    // Instructions.
  InstructionMissing: 100,
  InstructionFallbackNotFound: 101,
  InstructionDidNotDeserialize: 102,
  InstructionDidNotSerialize: 103,

  // IDL instructions.
  IdlInstructionStub: 120,
  IdlInstructionInvalidProgram: 121,

  // Constraints.
  ConstraintMut: 140,
  ConstraintBelongsTo: 141,
  ConstraintSigner: 142,
  ConstraintRaw: 143,
  ConstraintOwner: 144,
  ConstraintRentExempt: 145,
  ConstraintSeeds: 146,
  ConstraintExecutable: 147,
  ConstraintState: 148,
  ConstraintAssociated: 149,
  ConstraintAssociatedInit: 150,

  // Accounts.
  AccountDiscriminatorAlreadySet: 160,
  AccountDiscriminatorNotFound: 161,
  AccountDiscriminatorMismatch: 162,
  AccountDidNotDeserialize: 163,
  AccountDidNotSerialize: 164,
  AccountNotEnoughKeys: 165,
  AccountNotMutable: 166,
  AccountNotProgramOwned: 167,

  // State.
  StateInvalidAddress: 180,

  // Used for APIs that shouldn't be used anymore.
  Deprecated: 299,
};

const ErrorMessages = new Map([
	[
		ErrorCode.InstructionMissing,
		"8 byte instruction identifier not provided",
	],
	[
		ErrorCode.InstructionFallbackNotFound,
		"Fallback functions are not supported",
	],
	[
		ErrorCode.InstructionDidNotDeserialize,
		"The program could not deserialize the given instruction",
	],
	[
		ErrorCode.InstructionDidNotSerialize,
		"The program could not serialize the given instruction",
	],
	[
		ErrorCode.IdlInstructionStub,
		"The program was compiled without idl instructions",
	],
	[
		ErrorCode.IdlInstructionInvalidProgram,
		"The transaction was given an invalid program for the IDL instruction",
	],
	[
		ErrorCode.ConstraintMut,
		"A mut constraint was violated",
	],
	[
		ErrorCode.ConstraintBelongsTo,
		"A belongs_to constraint was violated",
	],
	[
		ErrorCode.ConstraintSigner,
		"A signer constraint was violated",
	],
	[
		ErrorCode.ConstraintRaw,
		"A raw constraint as violated",
	],
	[
		ErrorCode.ConstraintOwner,
		"An owner constraint was violated",
	],
	[
		ErrorCode.ConstraintRentExempt,
		"A rent exempt constraint was violated",
	],
	[
		ErrorCode.ConstraintSeeds,
		"A seeds constraint was violated",
	],
	[
		ErrorCode.ConstraintExecutable,
		"An executable constraint was violated",
	],
	[
		ErrorCode.ConstraintState,
		"A state constraint was violated",
	]
]);
