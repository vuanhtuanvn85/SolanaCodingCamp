use anchor_lang::prelude::*;

#[account]
pub struct Profile {
    pub full_name: String,
    pub birthday: i64,
    pub email: String,
    pub is_email_verified: bool,
    pub ipfs_link: String,
    pub ipfs_key: String,
}

impl Profile {
    pub const SIZE: usize = 8 + 100 + 8 + 100 + 1 + 100 + 100;
}
