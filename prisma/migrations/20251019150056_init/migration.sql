-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'GUEST', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PAGE_VIEW', 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'GUEST_ACCESS', 'FILTER_CHANGE', 'REPORT_GENERATED', 'MAP_INTERACTION', 'POLLSTER_COMPARISON', 'UPGRADE_ATTEMPT', 'ERROR');

-- CreateEnum
CREATE TYPE "SurveyScope" AS ENUM ('NATIONAL', 'PROVINCIAL');

-- CreateEnum
CREATE TYPE "Chamber" AS ENUM ('DIPUTADOS', 'SENADORES');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('NATIONAL', 'PROVINCIAL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'GUEST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guestExpiresAt" TIMESTAMP(3),
    "premiumSince" TIMESTAMP(3),
    "premiumUntil" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL,
    "eventName" TEXT NOT NULL,
    "userId" TEXT,
    "userEmail" TEXT,
    "userRole" "UserRole",
    "metadata" JSONB,
    "sessionId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "pollster" TEXT NOT NULL,
    "scope" "SurveyScope" NOT NULL,
    "province" TEXT,
    "chamber" "Chamber" NOT NULL,
    "LLA" DOUBLE PRECISION,
    "FP" DOUBLE PRECISION,
    "PU" DOUBLE PRECISION,
    "UCR" DOUBLE PRECISION,
    "PRO" DOUBLE PRECISION,
    "FIT" DOUBLE PRECISION,
    "Provincial" DOUBLE PRECISION,
    "Others" DOUBLE PRECISION,
    "sample" INTEGER,
    "methodology" TEXT,
    "marginError" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generated_reports" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "province" TEXT,
    "content" TEXT NOT NULL,
    "tokensUsed" INTEGER,
    "generationTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "generated_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_config" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_sessionToken_idx" ON "sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "analytics_events_eventType_idx" ON "analytics_events"("eventType");

-- CreateIndex
CREATE INDEX "analytics_events_userId_idx" ON "analytics_events"("userId");

-- CreateIndex
CREATE INDEX "analytics_events_createdAt_idx" ON "analytics_events"("createdAt");

-- CreateIndex
CREATE INDEX "analytics_events_eventName_idx" ON "analytics_events"("eventName");

-- CreateIndex
CREATE INDEX "surveys_date_idx" ON "surveys"("date");

-- CreateIndex
CREATE INDEX "surveys_pollster_idx" ON "surveys"("pollster");

-- CreateIndex
CREATE INDEX "surveys_scope_idx" ON "surveys"("scope");

-- CreateIndex
CREATE INDEX "surveys_province_idx" ON "surveys"("province");

-- CreateIndex
CREATE INDEX "surveys_chamber_idx" ON "surveys"("chamber");

-- CreateIndex
CREATE INDEX "generated_reports_userId_idx" ON "generated_reports"("userId");

-- CreateIndex
CREATE INDEX "generated_reports_createdAt_idx" ON "generated_reports"("createdAt");

-- CreateIndex
CREATE INDEX "generated_reports_reportType_idx" ON "generated_reports"("reportType");

-- CreateIndex
CREATE UNIQUE INDEX "system_config_key_key" ON "system_config"("key");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generated_reports" ADD CONSTRAINT "generated_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
