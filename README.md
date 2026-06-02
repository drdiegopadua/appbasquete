# 🏀 Supercopa de Basquete — App PWA

App oficial da Supercopa de Basquete de Afonso Cláudio.  
Funciona como PWA (instalável no celular), usa Google Sheets como banco de dados e GitHub Pages para hospedagem.

---

## 📁 Estrutura de arquivos

```
/
├── index.html        ← App principal (edite o bloco CFG dentro dele)
├── manifest.json     ← Configuração PWA
├── sw.js             ← Cache offline
├── logo.png          ← Logo do torneio
├── icons/            ← Ícones PWA (icon-512x512.png obrigatório)
├── deploy.sh         ← Script de deploy (Mac/Linux)
└── deploy.bat        ← Script de deploy (Windows)
```

---

## 🚀 Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `supercopa-basquete`)
2. Faça upload de todos os arquivos
3. Vá em **Settings → Pages → Branch: main → / (root) → Save**
4. Em poucos minutos o app estará em: `https://seu-usuario.github.io/supercopa-basquete/`

---

## 📊 Como conectar o Google Sheets (gerenciar jogos e classificação)

### Passo 1 — Criar a planilha

1. Acesse [sheets.new](https://sheets.new) e crie uma planilha
2. Crie **duas abas** com os nomes exatos:

**Aba "jogos"** — colunas (linha 1 = cabeçalho):
| id | data  | hora  | fase     | timeA         | timeB         | placarA | placarB | status    |
|----|-------|-------|----------|---------------|---------------|---------|---------|-----------|
| 1  | 25/07 | 09:00 | Grupo A  | CT Montanhas  | Time Convidado 1 | 0   | 0       | agendado  |
| 2  | 25/07 | 10:30 | Grupo B  | Time Convidado 2 | Time Convidado 3 | 68 | 55    | finalizado |

> **Status válidos:** `agendado` · `live` · `finalizado`

**Aba "classificacao"** — colunas:
| time            | j | v | d | pp | pc | pts |
|-----------------|---|---|---|----|----|-----|
| CT Montanhas    | 1 | 1 | 0 | 68 | 55 | 2   |

> Dica: você pode deixar a classificação ser calculada automaticamente —
> basta não criar essa aba e o app calculará com base nos jogos finalizados.

---

### Passo 2 — Criar o Google Apps Script

1. Na planilha, clique em **Extensões → Apps Script**
2. Apague o código padrão e cole o código abaixo:

```javascript
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Lê jogos
  const jogosSheet = ss.getSheetByName('jogos');
  const jogosData  = jogosSheet.getDataRange().getValues();
  const jogosKeys  = jogosData[0];
  const jogos = jogosData.slice(1).map(row => {
    const obj = {};
    jogosKeys.forEach((k, i) => obj[k] = row[i]);
    obj.placarA = Number(obj.placarA) || 0;
    obj.placarB = Number(obj.placarB) || 0;
    return obj;
  });

  // Lê classificação (se a aba existir)
  let classificacao = [];
  const classSheet = ss.getSheetByName('classificacao');
  if (classSheet) {
    const classData = classSheet.getDataRange().getValues();
    const classKeys = classData[0];
    classificacao = classData.slice(1).map(row => {
      const obj = {};
      classKeys.forEach((k, i) => obj[k] = row[i]);
      ['j','v','d','pp','pc','pts'].forEach(k => obj[k] = Number(obj[k]) || 0);
      return obj;
    }).sort((a,b) => b.pts - a.pts);
  }

  const output = ContentService
    .createTextOutput(JSON.stringify({ jogos, classificacao }))
    .setMimeType(ContentService.MimeType.JSON);

  return output;
}
```

3. Clique em **Salvar** (💾)

---

### Passo 3 — Publicar o Apps Script

1. Clique em **Implantar → Nova implantação**
2. Clique na engrenagem ⚙️ e selecione **Aplicativo da Web**
3. Configure:
   - Descrição: `Supercopa API`
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**
4. Clique em **Implantar**
5. **Copie a URL** gerada (começa com `https://script.google.com/macros/s/...`)

---

### Passo 4 — Colocar a URL no app

Abra o `index.html` e encontre o bloco `CFG` no final do arquivo:

```javascript
const CFG = {
  sheetsUrl: 'SUA_URL_AQUI',   // ← cole aqui a URL copiada
  ...
};
```

Salve e faça o deploy novamente.

---

## ✏️ Como atualizar placares

1. Abra a planilha no Google Sheets
2. Edite os campos `placarA`, `placarB` e `status` dos jogos
3. **Pronto!** O app atualiza automaticamente (sem precisar fazer deploy)

---

## 📱 Como instalar no celular

- **Android:** Abra o site no Chrome → menu (⋮) → "Adicionar à tela inicial"
- **iPhone:** Abra no Safari → compartilhar (□↑) → "Adicionar à Tela de Início"

---

## 🎨 Personalização rápida

No `index.html`, bloco `CFG`:

```javascript
const CFG = {
  sheetsUrl:  'https://script.google.com/macros/s/...',
  dataInicio: '2026-07-25T08:00:00',   // data/hora de início
  local:      'Quadra Eurico Vieira de Resende',
  premio:     'R$ 5.000,00',
  descricao:  'Texto da tela inicial...',
};
```

Para mudar cores, edite as variáveis CSS no topo do `index.html`:
```css
--maroon: #7C0A02;   /* vermelho escuro */
--gold:   #F5A623;   /* dourado */
--orange: #FF6B35;   /* laranja destaque */
```
