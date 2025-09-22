'use client';

import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';

export function ExtractRichText({ richText }: { richText: Document }) {
  if (!richText || !(richText as any).content) return null;

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{text}</code>
      ),
      [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => <sup>{text}</sup>,
      [MARKS.SUBSCRIPT]: (text: React.ReactNode) => <sub>{text}</sub>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) =>
        children ? <p className="mb-4 leading-relaxed">{children}</p> : null,

      [BLOCKS.HEADING_1]: (_node: any, children: React.ReactNode) => (
        <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
        <h2 className="text-2xl font-bold mb-3 mt-5">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
        <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node: any, children: React.ReactNode) => (
        <h4 className="text-lg font-semibold mb-2 mt-3">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_node: any, children: React.ReactNode) => (
        <h5 className="text-base font-semibold mb-2 mt-3">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_node: any, children: React.ReactNode) => (
        <h6 className="text-sm font-semibold mb-2 mt-3">{children}</h6>
      ),

      [BLOCKS.UL_LIST]: (_node: any, children: React.ReactNode) => (
        <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: React.ReactNode) => (
        <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: React.ReactNode) => (
        <li className="leading-relaxed">{children}</li>
      ),

      [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic bg-muted/50 rounded-r">{children}</blockquote>
      ),

      [BLOCKS.HR]: () => <hr className="my-6 border-border" />,

      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
        const url = node.data?.uri || '#';
        return (
          <a
            href={url}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },

      [INLINES.ENTRY_HYPERLINK]: (_node: any, children: React.ReactNode) => (
        <a href="#" className="text-primary hover:underline">
          {children}
        </a>
      ),

      [INLINES.ASSET_HYPERLINK]: (node: any, children: React.ReactNode) => {
        const assetUrl = node.data?.target?.fields?.file?.url;
        return assetUrl ? (
          <a
            href={`https:${assetUrl}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ) : (
          <>{children}</>
        );
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = node.data?.target;
        const file = asset?.fields?.file;
        if (file?.contentType?.startsWith('image/') && file?.url) {
          const imageUrl = `https:${file.url}`;
          const alt = asset.fields.title || asset.fields.description || '';
          return (
            <figure className="my-6">
              <img src={imageUrl} alt={alt} className="w-full h-auto rounded-lg shadow-md" />
              {alt && (
                <figcaption className="text-sm text-muted-foreground mt-2 text-center">{alt}</figcaption>
              )}
            </figure>
          );
        }
        return null;
      },

      [BLOCKS.EMBEDDED_ENTRY]: (_node: any, children: React.ReactNode) => (
        <div className="my-4 p-4 border border-border rounded-lg bg-muted/30">{children}</div>
      ),
    },
  } as const;

  return <>{documentToReactComponents(richText as any, options as any)}</>;
}

export default ExtractRichText;


