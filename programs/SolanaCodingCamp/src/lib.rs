use anchor_lang::prelude::*;

declare_id!("FJ1ddJSwnigDNeyMqC1YD9RZzkykkq7ifXCm7pTnUVX4");

pub mod schema;
pub use schema::*;

pub mod instructions;
pub use instructions::*;

pub mod errors;
pub use errors::*;

#[program]
pub mod solana_coding_camp {

    use super::*;

    pub fn initialize_profile(ctx: Context<InitializeProfile>,
        full_name: String, 
        birthday: i64, 
        email: String, 
        ipfs_link: String, 
        ipfs_key: String
    ) -> Result<()> {
        initialize_profile::exec(ctx, full_name, birthday, email, ipfs_link, ipfs_key)
    }    
    pub fn update_profile(ctx: Context<UpdateProfile>,
        full_name: String, 
        birthday: i64, 
        email: String, 
        ipfs_link: String, 
        ipfs_key: String
    ) -> Result<()> {
        update_profile::exec(ctx, full_name, birthday, email, ipfs_link, ipfs_key)
    }    
}