1. Init project with anchor  
    `anchor SolanaCodingCamp`  
    `cd SolanaCodingCamp`  

2. Init reactjs  
    `npx create-react-app app --template typescript`  
    `cd app`  
    `npm start`  

3. Create and mint 1,000,000 token  
    `spl-token create-token`  
    Creating token 5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA  
    Signature: 4DamDJZBGsV9jb6QNjWgCEFDKYMkBJEK1o1cEww9tQ8dxJVBsquamEUEBJg4KFQWyZu3NzWKTe6ABtPDmUs62ifv  

    `spl-token create-account 5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA`  
    Creating account GW9LffcdzG3W5wAoydbgWXosDn7VXv6cB8wevHffqbx8  
    Signature: 2LjeLLUmHNtNjc9doRh1cYAGSkr31hgjtwbTp947KkofqNFxwu8ubNXnXe5YLHdVxLagt1EmmCyxiMc68eB2Uodc  

    `spl-token balance 5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA`  
    0  

    `spl-token mint 5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA 1000000`  
    Minting 1000000 tokens
    Token: 5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA
    Recipient: GW9LffcdzG3W5wAoydbgWXosDn7VXv6cB8wevHffqbx8
    Signature: 3yksrxZEvZ6unQbDPyGkvJtSyYvXrUiJQPAUYcbU6To5F8VoTL4mb9DuP1ggcVj5tyU9EJzJwo6BcSU7MVuAHqCu  

    `spl-token balance 5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA`  
    1000000  


    `spl-token supply 5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA`  
    1000000  

    `spl-token transfer --fund-recipient 5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA  300000 37NdHQCSR1sa7jGfKcKCufufztTGxv7qaYT4B88kqwCL`  
    Transfer 300000 tokens
    Sender: GW9LffcdzG3W5wAoydbgWXosDn7VXv6cB8wevHffqbx8
    Recipient: 37NdHQCSR1sa7jGfKcKCufufztTGxv7qaYT4B88kqwCL
    Recipient associated token account: 9Qr6V2iQu8JCA9C1NksJLpTwbtthHaoCG6jpredQDBd
    Funding recipient: 9Qr6V2iQu8JCA9C1NksJLpTwbtthHaoCG6jpredQDBd (0.00203928 SOL)
    Signature: 5wQLei6gmLMmKrGYb3gRJF9ARnUeCa1LgdNFANGWL8UBCNsvAEFsvFFmcw2zGSRXqc4sfSe7bU99unpHiNvWVqdL



