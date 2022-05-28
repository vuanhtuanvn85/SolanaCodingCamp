use anchor_lang::prelude::*;

#[account]
pub struct Ballot {
  pub voter: Pubkey,
  pub profile: Pubkey,
  pub amount: u64,
}

impl Ballot {
  pub const SIZE: usize = 8 + 32 + 32 + 8;
}
