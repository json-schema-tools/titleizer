# JSON Schema Titleizer

<center>
  <span>
    <img alt="CircleCI branch" src="https://img.shields.io/circleci/project/github/json-schema-tools/titleizer/master.svg">
    <img src="https://codecov.io/gh/json-schema-tools/titleizer/branch/master/graph/badge.svg" />
    <img alt="Dependabot status" src="https://api.dependabot.com/badges/status?host=github&repo=json-schema-tools/titleizer" />
    <img alt="npm" src="https://img.shields.io/npm/dt/@json-schema-tools/titleizer.svg" />
    <img alt="GitHub release" src="https://img.shields.io/github/release/json-schema-tools/titleizer.svg" />
    <img alt="GitHub commits since latest release" src="https://img.shields.io/github/commits-since/json-schema-tools/titleizer/latest.svg" />
  </span>
</center>

A tool to ensure that a schema and all its subschemas have a title. If there is no title present, one will be deterministically generated based on the schemas contents.

## Features

 - circular reference detection & handling
 - synchronous - doesn't touch the filesystem or make network requests. (use @json-schema-tools/dereferencer first if you have references)
 - generate subschema-dependent titles

## Getting Started

```sh
npm install @json-schema-tools/titleizer
```

```js
const titleizer = require("@json-schema-tools/titleizer").default;
//import titleizer from "@json-schema-tools/titleizer"

const mySchema = {
  type: "object",
  properties: {
    foo: {
      title: "foo",
      type: "array",
      items: { type: "string" }
    },
    bar: {
      title: "bar",
      anyOf: [
        { type: "string" },
        { type: "number" }
      ]
    }
  }
};

console.log(JSON.stringify(titleizer(mySchema), undefined, "  "));
```
Output from running the above:
```
{
  "type": "object",
  "properties": {
    "foo": {
      "title": "foo",
      "type": "array",
      "items": {
        "type": "string",
        "title": "string_doaGddGA"
      }
    },
    "bar": {
      "title": "bar",
      "anyOf": [
        {
          "type": "string",
          "title": "string_doaGddGA"
        },
        {
          "type": "number",
          "title": "number_Ho1clIqD"
        }
      ]
    }
  },
  "title": "objectOf_foo_bar_Bd1o3wyq"
}
```

### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
