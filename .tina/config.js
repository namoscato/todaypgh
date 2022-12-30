import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        label: "Stories",
        name: "stories",
        path: "content/story",
        format: 'md',
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish date",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL slug",
          },
          {
            type: "object",
            name: "educator",
            label: "Educator",
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                required: true,
              },
              {
                type: "boolean",
                name: "is_student",
                label: "Student?",
              },
              {
                type: "object",
                name: "contact",
                label: "Contact",
                fields: [
                  {
                    type: "string",
                    name: "website",
                    label: "Website URL",
                  },
                  {
                    type: "string",
                    name: "instagram",
                    label: "Instagram handle",
                  },
                  {
                    type: "string",
                    name: "facebook",
                    label: "Facebook handle",
                  },
                  {
                    type: "string",
                    name: "twitter",
                    label: "Twitter handle",
                  },
                  {
                    type: "string",
                    name: "linkedin",
                    label: "LinkedIn handle",
                  },
                ],
              },
            ],
          },
          {
            type: "string",
            name: "schools",
            label: "Schools",
            list: true,
          },
        ],
      },
      {
        label: "Pages",
        name: "pages",
        path: "content/spread-the-love",
        format: 'md',
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        label: "Schools",
        name: "schools",
        path: "content/schools",
        format: 'md',
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "object",
            name: "social",
            label: "Social",
            fields: [
              {
                type: "string",
                name: "twitter",
                label: "Twitter handle",
                list: true,
              },
              {
                type: "string",
                name: "facebook",
                label: "Facebook handle",
                list: true,
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram handle",
                list: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
