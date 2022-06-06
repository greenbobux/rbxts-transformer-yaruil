import ts, { factory } from "byots";
import { Context } from "../Context";
import { JsxElement, JsxSelfClosingElement } from "../stages/Stage1";

export function transformChildren(
	node: ts.NodeArray<ts.JsxChild>,
	context: Context
): ts.Expression[] {
	const transformed: ts.Expression[] = [];
	node.forEach((child) => {
		const index = transformed.length;
		if (ts.isJsxSelfClosingElement(child)) {
			transformed[index] = context
				.getStage(JsxSelfClosingElement)
				.visit(child);
		} else if (ts.isJsxElement(child)) {
			transformed[index] = context.getStage(JsxElement).visit(child);
		} else if (ts.isJsxExpression(child)) {
			const isSpread = child.dotDotDotToken;
			if (child.expression)
				if (isSpread)
					transformed[index] = factory.createSpreadElement(
						child.expression
					);
				else transformed[index] = child.expression;
		}
		// else if (ts.isJsxExpression(child)) {
		// 	const isSpread = child.dotDotDotToken !== undefined;
		// 	if (isSpread) {
		// 		transformed.push(factory.createSpreadAssignment(child));
		// 	} else if (child.expression !== undefined) {
		// 		if (ts.isCallExpression(child.expression)) {
		// 			transformed.push(
		// 				factory.createPropertyAssignment(
		// 					index,
		// 					child.expression
		// 				)
		// 			);
		// 		}
		// 	}
		// }
	});
	return transformed;
}
