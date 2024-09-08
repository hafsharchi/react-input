import React from "react";
import {
  ComponentDescriptor,
  ValidationComponentProps,
} from "../components/types";
import { Wrapper } from "../components/elements/Wrapper";
import { Title } from "../components/elements/Title";
import { Before } from "../components/elements/Before";
import { After } from "../components/elements/After";
import { Loading } from "../components/elements/Loading";

export const renderComponent = (
  descriptor: ComponentDescriptor,
  InputComponent: React.ReactNode,
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
  errors?: Array<string>,
  key?: number
): React.ReactNode => {
  switch (descriptor.type) {
    case "input":
      return InputComponent;
    case "wrapper":
      const wrapperChildren = descriptor.children
        ? descriptor.children.map((child, index) =>
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
              errors,
              index
            )
          )
        : null;
      return (
        <Wrapper key={key} className={wrapperClassName} tag={descriptor.tag}>
          {wrapperChildren}
        </Wrapper>
      );
    case "other":
      const otherChildren = descriptor.children
        ? descriptor.children.map((child, index) =>
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
              errors,
              index
            )
          )
        : null;
      return React.createElement(
        descriptor.tag ?? "div",
        { ...descriptor.props, key },
        descriptor.content,
        ...(otherChildren ?? "")
      );
    case "title":
      return (
        <Title
          key={key}
          title={title}
          tag={descriptor.tag}
          className={titleClassName}
        />
      );
    case "before":
      return (
        <Before
          key={key}
          tag={descriptor.tag}
          className={beforeClassName}
          before={before}
        />
      );
    case "after":
      return (
        <After
          key={key}
          tag={descriptor.tag}
          className={afterClassName}
          after={after}
        />
      );
    case "loading":
      return (
        <Loading
          key={key}
          tag={descriptor.tag}
          className={loadingClassName}
          loadingObject={loadingObject}
          isLoading={loading}
        />
      );
    case "validation":
      return (
        ValidationComponent && <ValidationComponent key={key} errors={errors} />
      );
    default:
      console.log("not valid type in Component structure");
      return null;
  }
};
