import React from "react";
import { After } from "../components/elements/After";
import { Before } from "../components/elements/Before";
import { Loading } from "../components/elements/Loading";
import { Title } from "../components/elements/Title";
import {
  ComponentDescriptor,
  ValidationComponentProps,
} from "../components/types";

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
  hasValue?: boolean,
  key?: number
): React.ReactNode => {
  switch (descriptor.type) {
    case "input":
      return InputComponent;
    case "wrapper": {
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
              hasValue,
              index
            )
          )
        : null;

      return React.createElement(
        descriptor.tag ?? "div",
        {
          ...{
            className: `${wrapperClassName} ${
              hasValue ? descriptor.hasValueClassName ?? "" : ""
            }`,
          },
          ...descriptor.props
        },
        key,
        ...(wrapperChildren ?? "")
      );
    }
    case "other": {
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
              hasValue,
              index
            )
          )
        : null;
      if (descriptor?.props?.className)
        descriptor.props.className += ` ${
          hasValue ? descriptor.hasValueClassName ?? "" : ""
        }`;
      return React.createElement(
        descriptor.tag ?? "div",
        { ...descriptor.props, key },
        descriptor.content,
        ...(otherChildren ?? "")
      );
    }
    case "title":
      return (
        <Title
          key={key}
          title={title}
          tag={descriptor.tag}
          className={`${titleClassName} ${
            hasValue ? descriptor.hasValueClassName ?? "" : ""
          }`}
        />
      );
    case "before":
      return (
        <Before
          key={key}
          tag={descriptor.tag}
          className={`${beforeClassName} ${
            hasValue ? descriptor.hasValueClassName ?? "" : ""
          }`}
          before={before}
        />
      );
    case "after":
      return (
        <After
          key={key}
          tag={descriptor.tag}
          className={`${afterClassName} ${
            hasValue ? descriptor.hasValueClassName ?? "" : ""
          }`}
          after={after}
        />
      );
    case "loading":
      return (
        <Loading
          key={key}
          tag={descriptor.tag}
          className={`${loadingClassName} ${
            hasValue ? descriptor.hasValueClassName ?? "" : ""
          }`}
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
