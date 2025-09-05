# VitraOne - Catálogo Digital de Vendas

Uma página web sofisticada e moderna para catálogo digitais de vendas, inspirada na ideia de vitrine. O nome transmite exclusividade, clareza e destaque para cada produto.

## 🎨 Características

- **Design Moderno**: Interface elegante e sofisticada inspirada em vitrines de luxo
- **Responsivo**: Adaptável a todos os dispositivos (desktop, tablet, mobile)
- **Interativo**: Animações suaves e efeitos visuais modernos
- **Pronto para Supabase**: Estrutura preparada para integração com banco de dados
- **Performance**: Código otimizado e carregamento rápido

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com Flexbox e Grid
- **JavaScript ES6+**: Interatividade e funcionalidades avançadas
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia elegante (Inter)

## 📁 Estrutura do Projeto

```
VitraOne/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interativo
└── README.md           # Documentação
```

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] Layout responsivo e moderno
- [x] Navegação suave entre seções
- [x] Sistema de filtros de produtos
- [x] Carrinho de compras interativo
- [x] Sistema de favoritos
- [x] Formulário de contato
- [x] Newsletter
- [x] Animações e efeitos visuais
- [x] Menu mobile responsivo

### 🔄 Em Desenvolvimento
- [ ] Integração com Supabase
- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Sistema de pagamento
- [ ] Busca avançada de produtos

## 🛠️ Como Usar

1. **Clone o repositório**:
   ```bash
   git clone [url-do-repositorio]
   cd VitraOne
   ```

2. **Abra o arquivo**:
   - Abra `index.html` em seu navegador
   - Ou use um servidor local (recomendado)

3. **Servidor Local** (opcional):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`:
```css
:root {
    --primary-color: #1a1a1a;      /* Cor principal */
    --accent-color: #d4af37;       /* Cor de destaque */
    --secondary-color: #f8f9fa;    /* Cor secundária */
}
```

### Produtos
Os produtos são carregados dinamicamente via JavaScript. Para adicionar novos produtos, edite o array `products` na classe `VitraOneApp`.

## 🔗 Integração com Supabase

O projeto está preparado para integração com Supabase. Para configurar:

1. **Crie um projeto no Supabase**
2. **Configure as variáveis**:
   ```javascript
   const supabase = new SupabaseConfig();
   supabase.url = 'SUA_URL_DO_SUPABASE';
   supabase.anonKey = 'SUA_CHAVE_ANONIMA';
   ```

3. **Estrutura do banco sugerida**:
   - `products` (id, name, price, category, image, description, featured, new, sale)
   - `users` (id, email, name, created_at)
   - `cart` (id, user_id, product_id, quantity)
   - `favorites` (id, user_id, product_id)

## 📱 Responsividade

O design é totalmente responsivo e funciona perfeitamente em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Próximos Passos

1. **Configurar Supabase** para persistência de dados
2. **Implementar autenticação** de usuários
3. **Adicionar sistema de pagamento**
4. **Criar painel administrativo**
5. **Implementar busca avançada**
6. **Adicionar sistema de avaliações**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação

## 📞 Contato

Para dúvidas ou sugestões, entre em contato:
- Email: contato@vitraone.com
- Website: [vitraone.com](https://vitraone.com)

---

**VitraOne** - Transformando a experiência de compra online em algo verdadeiramente especial e memorável. ✨
Vitra é uma plataforma sofisticada e moderna para catálogos digitais de vendas. Inspirado na ideia de vitrine, o nome transmite exclusividade, clareza e destaque para cada produto.
