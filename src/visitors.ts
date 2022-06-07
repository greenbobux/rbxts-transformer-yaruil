import ts, { Node } from "byots";
import { TransformContext } from "./Context";
import { transformElement } from "./transformations/transformElement";

export function visitNode(context: TransformContext, node: ts.Node) {
	if (ts.isJsxElement(node)) {
		return visitJsxElement(context, node);
	} else if (ts.isJsxSelfClosingElement(node)) {
		return visitJsxSelfClosingElement(context, node);
	}
	return context.transform(node);
}
export function visitJsxElement(
	context: TransformContext,
	node: ts.JsxElement
) {
	return context.transform(
		transformElement(
			node.openingElement.tagName,
			node.openingElement.attributes,
			node.children
		)
	);
}
export function visitJsxSelfClosingElement(
	context: TransformContext,
	node: ts.JsxSelfClosingElement
) {
	return context.transform(
		transformElement(node.tagName, node.attributes, [] as never)
	);
}
