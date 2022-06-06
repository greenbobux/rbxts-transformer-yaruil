import ts, { consumesNodeCoreModules, factory, isAssertsKeyword } from "byots";
import { Context } from "../Context";

export function transformAttributes(
	node: ts.JsxAttributes,
	context: Context
): ts.ObjectLiteralElementLike[] {
	const properties = node.properties;
	const transformed: ts.ObjectLiteralElementLike[] = [];
	if (properties)
		properties.forEach((property) => {
			if (ts.isJsxAttribute(property)) {
				const half = property.name.getText().split(":");
				const isOn = half[0] === "on";
				let initializer: ts.Expression;
				if (property.initializer)
					if (ts.isJsxExpression(property.initializer)) {
						const expression = property.initializer.expression;
						if (expression) {

							initializer = property.initializer.expression;
						} else {
							initializer = factory.createTrue();
						}
					} else initializer = factory.createTrue();
				transformed.push(
					factory.createPropertyAssignment(
						isOn ? half[1] : property.name.getText(),
						initializer!
					)
				);
			}
		});
	return transformed;
}
