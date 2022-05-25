use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The candidate isn't active")]
    NotActiveCandidate,
    #[msg("The candidate isn't ended")]
    NotEndedCandidate,
    #[msg("The full name is long thang 100 characters")]
    FullNameLongThan100,
    #[msg("The email is long thang 100 characters")]
    EmailLongThan100,
    #[msg("IPFS link is long thang 100 characters")]
    IPFSLinkLongThan100,
    #[msg("IPFS key is long thang 100 characters")]
    IPFSKeyLongThan100,
}
