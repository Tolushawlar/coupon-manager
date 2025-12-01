-- Create the coupons table
create table if not exists coupons (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  "discountType" text not null,
  "couponAmount" numeric not null default 0,
  "allowFreeShipping" boolean default false,
  "expiryDate" timestamp with time zone,
  "maximumSpend" numeric,
  "individualUseOnly" boolean default false,
  "excludeSaleItems" boolean default false,
  products text[] default '{}',
  "excludeProducts" text[] default '{}',
  "productCategories" text[] default '{}',
  "excludeCategories" text[] default '{}',
  "allowedEmails" text[] default '{}',
  "productBrands" text[] default '{}',
  "excludeBrands" text[] default '{}',
  "usageLimitPerCoupon" integer,
  "usageLimitPerUser" integer,
  "currentUsage" integer default 0,
  "createdAt" timestamp with time zone default now(),
  "updatedAt" timestamp with time zone default now()
);

-- Create an index on the code for faster lookups
create index if not exists coupons_code_idx on coupons (code);
