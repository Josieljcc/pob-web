# Domain glossary (PoB / Path of Building)

Terms aligned with Path of Building Community; short definitions for the TypeScript port.

| Term                               | Meaning                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Build**                          | Full character state: skills, tree, items, configuration, and calculation output (`mainOutput`). |
| **PassiveSpec** / **Passive tree** | Passive skill tree: nodes, paths, attributes, and allocated notables.                            |
| **Passive tree version**           | Tree JSON version (per league/atlas); drives data and import URLs.                               |
| **Mod** / **ModDB**                | Numeric or text modifier on items, tree, or config; mod database as JSON.                        |
| **Item**                           | Equipment piece with PoE text, sockets, implicits, and rolled mods.                              |
| **SocketGroup**                    | Linked socket group on one piece (supports and gems).                                            |
| **Calc** / **mainOutput**          | Aggregated calculation engine output (offence, defence, reservations, etc.).                     |
| **Build XML**                      | Serialization PoB uses to load/save builds; target for read/write parity.                        |
| **Import / Trade**                 | Character import from sites and trade API query generation (later phases).                       |

Layout and module reference in the Lua repo: `docs/rundown.md` in [Path of Building](https://github.com/PathOfBuildingCommunity/PathOfBuilding).
