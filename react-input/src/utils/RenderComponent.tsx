import React from "react";
import {
  ComponentDescriptor,
  ValidationComponentProps,
} from "../components/types";
import Wrapper from "../components/elements/Wrapper";
import Title from "../components/elements/Title";
import Before from "../components/elements/Before";
import After from "../components/elements/After";
import Loading from "../components/elements/Loading";

export const renderComponent = (
  descriptor: ComponentDescriptor,
  InputComponent: React.FC<any>,
  ValidationComponent?: React.FC<ValidationComponentProps>,
  title?: React.ReactNode,
  before?: React.ReactNode,
  after?: React.ReactNode,
  wrapperClassName?: string,
  beforeClassName?: string,
  loadingClassName?: string,
  titleClassName?: string,
  afterClassName?: string,
  loading?: boolean,
  loadingObject?: React.ReactNode,
  errors?: Array<string>
): React.ReactNode => {
  switch (descriptor.type) {
    case "input":
      return <InputComponent />;
    case "wrapper":
      const wrapperChildren = descriptor.children
        ? descriptor.children.map((child) =>
            renderComponent(
              child,
              InputComponent,
              ValidationComponent,
              title,
              before,
              after,
              wrapperClassName,
              beforeClassName,
              loadingClassName,
              titleClassName,
              afterClassName,
              loading,
              loadingObject,
              errors
            )
          )
        : null;
      return (
        <Wrapper className={wrapperClassName} tag={descriptor.tag}>
          {wrapperChildren}
        </Wrapper>
      );
    case "other":
      const otherChildren = descriptor.children
        ? descriptor.children.map((child) =>
            renderComponent(
              child,
              InputComponent,
              ValidationComponent,
              title,
              before,
              after,
              wrapperClassName,
              beforeClassName,
              loadingClassName,
              titleClassName,
              afterClassName,
              loading,
              loadingObject,
              errors
            )
          )
        : null;
      return React.createElement(
        descriptor.tag ?? "div",
        descriptor.props,
        descriptor.content,
        ...(otherChildren ?? "")
      );
    case "title":
      return (
        <Title title={title} tag={descriptor.tag} className={titleClassName} />
      );
    case "before":
      return (
        <Before
          tag={descriptor.tag}
          className={beforeClassName}
          before={before}
        />
      );
    case "after":
      return (
        <After tag={descriptor.tag} className={afterClassName} after={after} />
      );
    case "loading":
      return (
        <Loading
          tag={descriptor.tag}
          className={loadingClassName}
          loadingObject={loadingObject}
          isLoading={loading}
        />
      );
    case "validation":
      ValidationComponent && ValidationComponent({ errors: errors });
      break;
    default:
      console.log("render component returns null");
      return null;
  }
};
