# Plain Goods

Minimalist, responsive storefront in plain HTML, CSS and JavaScript. No build step.

## Structure

```
plain-goods/
  index.html              Page markup
  assets/
    css/styles.css        All styles, colour and theme tokens at the top
    js/products.js        Currency and product list (edit this to change the catalogue)
    js/app.js             Menu, filters, product window, cart
    images/               Product photos
    favicon.svg
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Add products and photos

1. Put photos in `assets/images/`.
2. In `assets/js/products.js`, add an object to `PRODUCTS` and set `img:"assets/images/your-photo.jpg"`.
3. Leave `img:""` to show the drawn placeholder.

## Before launch

- Connect a custom domain
- Connect a payment provider to the Checkout button (it currently shows a message only)
- Replace placeholder delivery, returns and About text in `index.html`
- Add privacy policy and terms pages if you collect customer data or take payments
