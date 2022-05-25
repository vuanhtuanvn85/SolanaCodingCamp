use anchor_lang::prelude::*;

declare_id!("4Q71d52Byvx9TcyhDNJXH98HPpvdiAeToyDn1tiqyhcP");

pub mod schema;
pub use schema::*;

pub mod instructions;
pub use instructions::*;

pub mod errors;
pub use errors::*;

#[program]
pub mod solana_coding_camp {

    use super::*;

    
}