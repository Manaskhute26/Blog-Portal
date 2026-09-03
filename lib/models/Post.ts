import mongoose, { Schema, Document, Model } from 'mongoose';

// ─── TypeScript Interface ─────────────────────────────────────
export interface IPostAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;           // Raw MDX/Markdown body
  date: Date;
  tags: string[];
  category: string;
  author: IPostAuthor;
  thumbnail?: string;
  readingTime?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Mongoose Schema ──────────────────────────────────────────
const AuthorSchema = new Schema<IPostAuthor>(
  {
    name:   { type: String, required: true },
    role:   { type: String, required: true },
    avatar: { type: String },
  },
  { _id: false }              // No separate _id for embedded subdoc
);

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Post slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe (lowercase alphanumeric with hyphens)'],
    },
    excerpt: {
      type: String,
      required: [true, 'Post excerpt is required'],
      trim: true,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
    },
    date: {
      type: Date,
      required: [true, 'Post date is required'],
      default: Date.now,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Post category is required'],
      enum: {
        values: ['Generative AI', 'Computer Vision', 'Campus Spotlight', 'AI Systems'],
        message: '{VALUE} is not a valid category',
      },
    },
    author: {
      type: AuthorSchema,
      required: [true, 'Post author is required'],
    },
    thumbnail: {
      type: String,
    },
    readingTime: {
      type: String,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,         // Adds createdAt & updatedAt automatically
  }
);

// ─── Indexes ──────────────────────────────────────────────────
PostSchema.index({ published: 1, date: -1 });       // Feed query: published posts sorted by date
PostSchema.index({ category: 1, published: 1 });    // Category filter

// ─── Model Export (prevent recompilation in Next.js HMR) ─────
const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;

