# Glossário de domínio (PoB / Path of Building)

Termos alinhados ao Path of Building Community; definições curtas para o clone em TypeScript.

| Termo                              | Significado                                                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Build**                          | Estado completo de uma personagem: skills, árvore, itens, configurações e resultado de cálculo (`mainOutput`). |
| **PassiveSpec** / **Passive tree** | Árvore de talentos passivos: nós, caminhos, atributos e notables alocados.                                     |
| **Passive tree version**           | Versão do JSON da árvore (por liga/atlas); condiciona dados e URL de import.                                   |
| **Mod** / **ModDB**                | Modificador numérico ou textual aplicado a itens, árvore ou configurações; base de dados de mods em JSON.      |
| **Item**                           | Peça de equipamento com texto PoE, sockets, implicits e mods rolados.                                          |
| **SocketGroup**                    | Grupo de sockets ligados na mesma peça (suportes e gemas).                                                     |
| **Calc** / **mainOutput**          | Resultado agregado do motor de cálculo (offence, defence, reservas, etc.).                                     |
| **XML de build**                   | Serialização usada pelo PoB para guardar/carregar builds; alvo de paridade de leitura/escrita.                 |
| **Import / Trade**                 | Importação de personagem de sites e geração de queries para a API de trade (fases posteriores).                |

Referência de layout e módulos no repositório Lua: `docs/rundown.md` no [Path of Building](https://github.com/PathOfBuildingCommunity/PathOfBuilding).
