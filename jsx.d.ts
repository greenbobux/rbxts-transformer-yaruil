/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />
type lowercaseCreatableInstances = {
	[P in keyof CreatableInstances as Lowercase<P>]: CreatableInstances[P];
};
import { returnedSignal } from "@rbxts/yaruil/out/createSignal";
import { elementLike } from "@rbxts/yaruil/out/util/types";
export type JsxNode =
	| ReadonlyArray<elementLike>
	| ReadonlyMap<string | number, elementLike>
	| elementLike;
declare global { 
	namespace JSX {
		type Element = elementLike;
		export type JsxAttributes<T extends Instance> = {
			[P in WritablePropertyNames<T>]?:
				| T[P]
				| (<V extends []>(...args: V) => T[P] | undefined);
		} & {
			[K in InstanceEventNames<T> as K extends string
				? `on:${K}`
				: never]?: T[K] extends RBXScriptSignal<infer C>
				? (...args: Parameters<C>) => void
				: never;
		} & {
			children?: {};
		};

		export type JsxInstance<T extends Instance> = JsxAttributes<T>;

		interface IntrinsicAttributes {
			_jsx_children?: {};
		}
		interface ElementAttributesProperty {
			props?: {};
		}
		interface ElementChildrenAttribute {
			children?: {};
		}
		interface IntrinsicElements {
			billboardgui: JsxInstance<BillboardGui>;
			camera: JsxInstance<Camera>;
			canvasgroup: JsxInstance<CanvasGroup>;
			frame: JsxInstance<Frame>;
			imagebutton: JsxInstance<ImageButton>;
			imagelabel: JsxInstance<ImageLabel>;
			screengui: JsxInstance<ScreenGui>;
			scrollingframe: JsxInstance<ScrollingFrame>;
			surfacegui: JsxInstance<SurfaceGui>;
			textbox: JsxInstance<TextBox>;
			textbutton: JsxInstance<TextButton>;
			textlabel: JsxInstance<TextLabel>;
			uiaspectratioconstraint: JsxInstance<UIAspectRatioConstraint>;
			uicorner: JsxInstance<UICorner>;
			uigradient: JsxInstance<UIGradient>;
			uigridlayout: JsxInstance<UIGridLayout>;
			uilistlayout: JsxInstance<UIListLayout>;
			uipadding: JsxInstance<UIPadding>;
			uipagelayout: JsxInstance<UIPageLayout>;
			uiscale: JsxInstance<UIScale>;
			uisizeconstraint: JsxInstance<UISizeConstraint>;
			uistroke: JsxInstance<UIStroke>;
			uitablelayout: JsxInstance<UITableLayout>;
			uitextsizeconstraint: JsxInstance<UITextSizeConstraint>;
			viewportframe: JsxInstance<ViewportFrame>;
		}
	}
}

export {};
