export type SolanaCodingCamp = {
  "version": "0.1.0",
  "name": "solana_coding_camp",
  "instructions": [
    {
      "name": "initializeProfile",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fullName",
          "type": "string"
        },
        {
          "name": "birthday",
          "type": "i64"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "ipfsLink",
          "type": "string"
        },
        {
          "name": "ipfsKey",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fullName",
            "type": "string"
          },
          {
            "name": "birthday",
            "type": "i64"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "isEmailVerified",
            "type": "bool"
          },
          {
            "name": "ipfsLink",
            "type": "string"
          },
          {
            "name": "ipfsKey",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotActiveCandidate",
      "msg": "The candidate isn't active"
    },
    {
      "code": 6001,
      "name": "NotEndedCandidate",
      "msg": "The candidate isn't ended"
    }
  ]
};

export const IDL: SolanaCodingCamp = {
  "version": "0.1.0",
  "name": "solana_coding_camp",
  "instructions": [
    {
      "name": "initializeProfile",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fullName",
          "type": "string"
        },
        {
          "name": "birthday",
          "type": "i64"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "ipfsLink",
          "type": "string"
        },
        {
          "name": "ipfsKey",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fullName",
            "type": "string"
          },
          {
            "name": "birthday",
            "type": "i64"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "isEmailVerified",
            "type": "bool"
          },
          {
            "name": "ipfsLink",
            "type": "string"
          },
          {
            "name": "ipfsKey",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotActiveCandidate",
      "msg": "The candidate isn't active"
    },
    {
      "code": 6001,
      "name": "NotEndedCandidate",
      "msg": "The candidate isn't ended"
    }
  ]
};
