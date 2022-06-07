import ts from "byots";
import { TransformContext } from "./Context";

// All stages must be in this list, and will run in the order of the list.
// eslint-disable-next-line prettier/prettier

/**
 * This is the transformer's configuration, the values are passed from the tsconfig.
 */
export interface TransformerConfig {
	_: void;
}

/**
 * The actual transformer.
 * Creates and instantiates the context, and transforms the source files.
 */
export default function (program: ts.Program, config: TransformerConfig) {
	return (
		transformationContext: ts.TransformationContext
	): ((file: ts.SourceFile) => ts.Node) => {
		const context = new TransformContext(
			program,
			transformationContext,
			config
		);
		return (file: ts.SourceFile) => {
			return context.transform(file);
		};
	};
}
