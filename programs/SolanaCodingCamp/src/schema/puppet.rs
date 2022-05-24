use anchor_lang::prelude::*;

#[account]
pub struct PuppetData {
    pub data: u64,
}

impl PuppetData {
    pub const SIZE: usize = 8 + 8;
}
