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
      <SidebarLink to="/docs/calendar">Calendar</SidebarLink>
      <SidebarLink to="/docs/select">Select</SidebarLink>
      <SidebarLink to="/docs/textarea">Textarea</SidebarLink>
      <SidebarLink to="/docs/password">Password</SidebarLink>

      <h1 className="font-semibold text-foreground mt-4">Validation</h1>
      <SidebarLink to="/docs/validation-component">Validation Component</SidebarLink>
      <SidebarLink to="/docs/custom-validations">Custom Validations</SidebarLink>
      <SidebarLink to="/docs/validation-defaults">Validation defaults</SidebarLink>
      <SidebarLink to="/docs/validation-on">Validation on</SidebarLink>

      <h1 className="font-semibold text-foreground mt-4">Other Features</h1>
      <SidebarLink to="/">Styling</SidebarLink>
      <SidebarLink to="/docs/loading">Loading</SidebarLink>
      <SidebarLink to="/docs/disabled">Disabled</SidebarLink>
      <SidebarLink to="/">Validation on</SidebarLink>
      <SidebarLink to="/docs/before-after">Before & After</SidebarLink>
      <SidebarLink to="/">Update field valus</SidebarLink>
      <SidebarLink to="/">Default value</SidebarLink>
    </div>
  );
}
