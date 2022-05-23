use anchor_lang::prelude::*;

#[account]
pub struct VoteFood {
    pub pizza: u64,
    pub hamburger: u64,
    pub bump: u8,
}

impl VoteFood {
    pub const SIZE: usize = 8 + 16 + 1;
}
