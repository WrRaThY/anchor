use solana_program::program_error::ProgramError;
use std::convert::From;
use std::fmt::{Debug, Display, Error as FmtError, Formatter};

#[doc(hidden)]
#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error(transparent)]
    ProgramError(#[from] ProgramError),
    #[error("{0:?}")]
    ErrorCode(#[from] ErrorCode),
}

// Error codes that can be returned by internal framework code.
#[derive(Debug, Clone, Copy)]
#[repr(u32)]
pub enum ErrorCode {
    // Instructions.
    InstructionMissing = 100,
    InstructionFallbackNotFound,
    InstructionDidNotDeserialize,
    InstructionDidNotSerialize,

    // IDL instructions.
    IdlInstructionInvalid = 120,
    IdlInstructionStub,
    IdlInstructionInvalidProgram,

    // Constraints.
    ConstraintMut = 140,
    ConstraintBelongsTo,
    ConstraintSigner,
    ConstraintRaw,
    ConstraintOwner,
    ConstraintRentExempt,
    ConstraintSeeds,
    ConstraintExecutable,
    ConstraintState,
    ConstraintAssociated,
    ConstraintAssociatedInit,

    AccountDiscriminatorAlreadySet = 160,
    AccountDiscriminatorNotFound,
    AccountDiscriminatorMismatch,
    AccountDidNotDeserialize,
    AccountDidNotSerialize,
    AccountNotEnoughKeys,
    AccountNotMutable,
    AccountNotProgramOwned,

    // State.
    StateInvalidAddress = 180,

    // Used for APIs that shouldn't be used anymore.
    Deprecated = 299,
}

impl Display for ErrorCode {
    fn fmt(&self, fmt: &mut Formatter<'_>) -> Result<(), FmtError> {
        <Self as Debug>::fmt(self, fmt)
    }
}

impl std::error::Error for ErrorCode {}

impl From<Error> for ProgramError {
    fn from(e: Error) -> ProgramError {
        match e {
            Error::ProgramError(e) => e,
            Error::ErrorCode(c) => ProgramError::Custom(c as u32),
        }
    }
}

impl From<ErrorCode> for ProgramError {
    fn from(e: ErrorCode) -> ProgramError {
        return Error::ErrorCode(e).into();
    }
}
