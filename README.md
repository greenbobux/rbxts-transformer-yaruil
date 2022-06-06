# rbxts-transformer-yaruil

This is the transformer used for JSX support with the [Yauril](https://github.com/greenbobux/yaruil) library

I used <i>rbxts-transformer-template</i> as a template.
beware of spaghetti code

Once you've installed the transformer, add this to your tsconfig.json
```json
"types": ["rbxts-transformer-yaruil"],
"plugins": [{"transform": "rbxts-transformer-yaruil"}]
```