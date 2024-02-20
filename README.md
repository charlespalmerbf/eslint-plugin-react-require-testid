# eslint-plugin-react-require-testid

This ESLint plugin is used for ensuring the testID attribute is on all relevant components in React Native.

## Installation

```shell
yarn add eslint-plugin-react-require-testid --dev
```

## Usage

Configure ESLint to use the plugin. Add it to the ESLint configuration:

```javascript
{
  "plugins": ["react-require-testid"],
  "rules": {
    "react-require-testid/testid-missing": "error"
  }
}
```
