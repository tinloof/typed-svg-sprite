---
"@tinloof/typed-svg-sprite": patch
---

Generate the `Icon` component from `React.ComponentPropsWithRef<"svg">` instead of `React.SVGProps<SVGSVGElement>`. The old base typed `ref` as `LegacyRef` (allowing string refs), which React 19's intrinsic elements reject — causing a type error in the generated `Icon.tsx`. The new base uses the React-19-correct `Ref` typing.
