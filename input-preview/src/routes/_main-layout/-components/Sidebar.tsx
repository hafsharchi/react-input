import SidebarLink from "./SidebarLink";

type Props = {
  className: string;
};

export default function Sidebar({ className }: Props) {
  return (
    <div className={`${className} p-5 leading-loose text-sm hidden md:block`}>
      <h1 className="font-semibold text-foreground ">Getting Started</h1>
      <SidebarLink to="/docs/introduction">Introduction</SidebarLink>
      <SidebarLink to="/">Installation</SidebarLink>

      <h1 className="font-semibold text-foreground mt-4">Types</h1>
      <SidebarLink to="/docs/text">Text</SidebarLink>
      <SidebarLink to="/docs/integer-decimal">Integer / Decimal</SidebarLink>
      <SidebarLink to="/docs/d">Calendar</SidebarLink>
      <SidebarLink to="/docs/t">Select</SidebarLink>
      <SidebarLink to="/docs/textarea">Textarea</SidebarLink>
      <SidebarLink to="/docs/password">Password</SidebarLink>

      <h1 className="font-semibold text-foreground mt-4">Validation</h1>
      <SidebarLink to="/">Validation Component</SidebarLink>
      <SidebarLink to="/">Custom Validations</SidebarLink>
      <SidebarLink to="/">Set default validation errors</SidebarLink>
      <SidebarLink to="/">Validation on</SidebarLink>

      <h1 className="font-semibold text-foreground mt-4">Other Features</h1>
      <SidebarLink to="/">Styling</SidebarLink>
      <SidebarLink to="/">Loading</SidebarLink>
      <SidebarLink to="/">Disabled</SidebarLink>
      <SidebarLink to="/">Validation on</SidebarLink>
      <SidebarLink to="/">After/Before</SidebarLink>
      <SidebarLink to="/">Update field valus</SidebarLink>
      <SidebarLink to="/">Default value</SidebarLink>
    </div>
  );
}
