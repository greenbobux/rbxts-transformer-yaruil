import ts from "byots";
import { Stage } from "../Context";
import { transformElement } from "../transformations/transformElement";

export class JsxElement extends Stage<ts.JsxElement> {
	public wants(node: ts.Node): node is ts.JsxElement {
		return ts.isJsxElement(node);
	}
	public visit(node: ts.JsxElement): ts.CallExpression {
		const element = transformElement(
			node.openingElement.tagName,
			this.context,
			node.openingElement.attributes,
			node.children
		);

		return element;
	}
}

export class JsxSelfClosingElement extends Stage<ts.JsxSelfClosingElement> {
	public wants(node: ts.Node): node is ts.JsxSelfClosingElement {
		return ts.isJsxSelfClosingElement(node);
	}
	public visit(node: ts.JsxSelfClosingElement): ts.CallExpression {
		const element = transformElement(
			node.tagName,
			this.context,
			node.attributes,
			[] as never
		);
		return element;
	}
}
