import ts, { classicNameResolver, factory } from "byots";
import { Context } from "../Context";
import { transformChildren } from "./transformChildren";
import { transformAttributes } from "./transformAttributes";
import { readFileSync } from "fs";
import { join } from "path";
const classes = JSON.parse(
	readFileSync(join(__dirname, "..", "classes.json"), "utf-8")
) as { [key: string]: string };
export function transformElement(
	element: ts.JsxTagNameExpression,
	context: Context,
	attributes: ts.JsxAttributes,
	children?: ts.NodeArray<ts.JsxChild>
): ts.CallExpression {
	const transformedChildren: ts.Expression[] = children
		? transformChildren(children, context)
		: [];
	const transformedAttributes: ts.ObjectLiteralElementLike[] = attributes
		? transformAttributes(attributes, context)
		: [];
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(
			factory.createIdentifier("Yaruil"),
			factory.createIdentifier("createElement")
		),
		undefined,
		[
			ts.isIntrinsicJsxName(element.getText())
				? factory.createStringLiteralFromNode(
						factory.createIdentifier(classes[element.getText()])
				  )
				: factory.createIdentifier(element.getText()),
			factory.createObjectLiteralExpression(transformedAttributes, false),
			factory.createArrayLiteralExpression(transformedChildren, false),
		]
	);
	// return factory.createCallExpression(
	// 	factory.createPropertyAccessExpression(
	// 		factory.createIdentifier("Yaruil"),
	// 		factory.createIdentifier("createElement")
	// 	),
	// 	undefined,
	// 	[
	// 		ts.isIntrinsicJsxName(element.getText())
	// 			? factory.createStringLiteralFromNode(
	// 					factory.createIdentifier(element.getText())
	// 			  )
	// 			: factory.createIdentifier(element.getText()),
	// 		factory.createObjectLiteralExpression(transformedAttributes, false),
	// 		factory.createObjectLiteralExpression(transformedChildren, false),
	// 	]
	// );
}
