use anchor_lang::prelude::*;

#[account]
pub struct Actor {
    pub cv_link: string,
    pub email: string,
}

impl Actor {
    pub const SIZE: usize = 8 + 32 + 8 + 8 + 8;
}
