# odd ResourceModel

## Usage

```js
// resource_models/user.js
import ResourceModelBase from "odd-resource_model";

const OPTIONS = {
  apiPath: "/api",
  apiVersion: "v1",
  scope: "web",
  resourceType: "users",
  attributes: ["id", "email", "name", "avatar", "created_at", "last_signed_at"],
  editableAttributes: ["email", "password", "name", "avatar"]
};

export default class User extends Base {
  constructor(attributes = {}) {
    super(OPTIONS, attributes);
  }

  // extra methods or helpers here...
}
```
