# Ligador ⛓
Ligador utiliza do açucar sintático `class` para melhor um melhor paradigma de programação e tenta manter simplicidade visual e de sintaxe.

## Modo de usar
Instancie a classe, passando o **objeto** e sua **propriedade** a serem ligados às ações externas deferidas por meio da interação humana (inputs de forms, por exemplo) ou programáticas.

Taqui um exemplo:
```html
<input type=text class="input-1">
<input type=text class="input-2" readonly>
<span type=text class="saida"></span>
```

```javascript
const meuObjeto = {
    minhaPropriedade: "abc"
};

const meuInput = document.querySelector('.input-1'),
        meuInput2 = document.querySelector('.input-2'),
        minhaSaida = document.querySelector('.saida');

new Ligador({
    objeto: meuObjeto,
    propriedade: minhaPropriedade
}).adicionarLiga(meuInput, 'value', 'keyup').adicionarLiga(meuInput2, 'value', (elemento, atributo) => { meuObjeto.minhaPropriedade === "" ? elemento.hidden = true : elemento.hidden = false }).adicionarLiga(minhaSaida, 'innerHTML');
```