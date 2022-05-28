use anchor_lang::prelude::*;

#[account]
pub struct Profile {
    pub profile_owner: Pubkey,
    pub full_name: String,
    pub birthday: i64,
    pub email: String,
    pub ipfs_link: String,
    pub ipfs_key: String,
    pub ballots: Vec<Pubkey>,
    pub sum_positive: u64,
    pub sum_negative: u64,
    pub start_time: i64,
    pub bump: u8,
}

impl Profile {
    pub const SIZE: usize = 8 + 4 + 100 + 8 + 4 + 100 + 1 + 4 + 100 + 4 + 100 + 4 + 32 * 10 + 8 + 8+ 1;
}