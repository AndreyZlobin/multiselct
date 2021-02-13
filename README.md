# Great multiselect

So simple plugin to use, just create a class instance and pass parameters

## Installation

Use the package manager [multiselect](https://www.npmjs.com/package/great_multiselect) to install foobar.

```bash
npm install --save-dev great_multiselect
```

## Usage

```javaScript
const MultiSelect = require('great_multiselect');

const select = new MultiSelect(multiSelect`, someOptions);
```

## Options description

> - multiSelect - just root element where the select will be located


## Options

```javaScript
const someOptions= {
    options: [
        {id: 1, name: "JavaScript"},
        {id: 2, name: "Angular"},
        {id: 3, name: "VueJs"},
        {id: 4, name: "React"},
        {id: 5, name: "Svelte"},
        {id: 6, name: "Ember"},
        {id: 7, name: "Redux"},
    ],
    placeholder: "Select something option",
    notFoundOption: "Option not found...",
};
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/AndreyZlobin/multiselct/blob/master/LICENSE)
