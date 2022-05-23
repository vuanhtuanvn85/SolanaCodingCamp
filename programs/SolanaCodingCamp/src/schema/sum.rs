use anchor_lang::prelude::*;

#[account]
pub struct Sum {
    pub sum: u64,
}

impl Sum {
    pub const SIZE: usize = 8 + 8;
}
