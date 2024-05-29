const defaultComponents = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
];

module.exports = {
    rules: {
        "testid-missing": {
            create(context) {
                const options = context.options[0] || {};
                const { disableDefaultComponents = [], enableComponents = [] } =
                    options;

                return {
                    JSXOpeningElement(node) {
                        const { name, attributes } = node;
                        if (!name || !name.name) {
                            return; // Return early if name or name.name is undefined
                        }
                        const componentName = name.name;

                        const filteredDefaultComponents =
                            defaultComponents.filter(
                                (component) =>
                                    !disableDefaultComponents.includes(
                                        component
                                    )
                            );
                        const mergedAllowedComponents = [
                            ...filteredDefaultComponents,
                            ...enableComponents,
                        ];
                        if (mergedAllowedComponents.includes(componentName)) {
                            const hasTestIDAttribute = attributes.some(
                                (attribute) =>
                                    attribute.name &&
                                    attribute.name.name === "data-testid" // Check if attribute.name is defined before accessing its name property
                            );

                            if (!hasTestIDAttribute) {
                                context.report({
                                    node: name,
                                    message: `React component <${componentName}> should have a data-testid attribute.`,
                                });
                            }
                        }
                    },
                };
            },
        },
    },
};
