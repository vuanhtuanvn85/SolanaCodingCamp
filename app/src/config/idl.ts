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
          "isSigner": false
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
    },
    {
      "name": "updateProfile",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
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
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
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
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voterTokenAccount",
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
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "isPositive",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ballot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voter",
            "type": "publicKey"
          },
          {
            "name": "profile",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileOwner",
            "type": "publicKey"
          },
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
          },
          {
            "name": "ballots",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "sumPositive",
            "type": "u64"
          },
          {
            "name": "sumNegative",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
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
    },
    {
      "code": 6002,
      "name": "FullNameLongThan100",
      "msg": "The full name is long thang 100 characters"
    },
    {
      "code": 6003,
      "name": "EmailLongThan100",
      "msg": "The email is long thang 100 characters"
    },
    {
      "code": 6004,
      "name": "IPFSLinkLongThan100",
      "msg": "IPFS link is long thang 100 characters"
    },
    {
      "code": 6005,
      "name": "IPFSKeyLongThan100",
      "msg": "IPFS key is long thang 100 characters"
    },
    {
      "code": 6006,
      "name": "ListFull",
      "msg": "List ref_checkers is full (10 elements)"
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
          "isSigner": false
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
    },
    {
      "name": "updateProfile",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
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
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
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
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voterTokenAccount",
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
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "isPositive",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ballot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voter",
            "type": "publicKey"
          },
          {
            "name": "profile",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileOwner",
            "type": "publicKey"
          },
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
          },
          {
            "name": "ballots",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "sumPositive",
            "type": "u64"
          },
          {
            "name": "sumNegative",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
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
    },
    {
      "code": 6002,
      "name": "FullNameLongThan100",
      "msg": "The full name is long thang 100 characters"
    },
    {
      "code": 6003,
      "name": "EmailLongThan100",
      "msg": "The email is long thang 100 characters"
    },
    {
      "code": 6004,
      "name": "IPFSLinkLongThan100",
      "msg": "IPFS link is long thang 100 characters"
    },
    {
      "code": 6005,
      "name": "IPFSKeyLongThan100",
      "msg": "IPFS key is long thang 100 characters"
    },
    {
      "code": 6006,
      "name": "ListFull",
      "msg": "List ref_checkers is full (10 elements)"
    }
  ]
};
