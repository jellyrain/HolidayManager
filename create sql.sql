create table personnel -- 人员表
(
    id     text primary key, -- 人员 id 软件 生成 uuid4
    name   text,             -- 人员名
    status int               --当前状态
);

create table scheduling -- 假期调度表
(
    id           text primary key, -- 记录 id 软件 生成 uuid4
    personnelId  text,             -- 人员 id
    holidayId    text,             -- 假期 id
    vacationTime REAL              -- 日期 （单位 天）
);

create table holiday -- 假期表
(
    id          text primary key, -- 假期 id 软件 生成 uuid4
    name        text,             -- 假期名称
    unit        text,             -- 计算单位 （d 天，h 小时）
    status      int,              -- 当前状态 （0 禁用，1 启用）
    reset       int,              -- 是否重置 （0 不重置，1 重置）
    startTime   text,             -- 开始时间
    description text              -- 备注
);

create table holidayLog -- 假期记录表
(
    id          text primary key,                            -- 记录 id 软件 生成 uuid4
    personnelId text,                                        -- 人员 id
    holidayId   text,                                        -- 假期 id
    number      int,                                         -- 数量
    logTime     text default (datetime('now', 'localtime')), -- 日志日期
    description text                                         -- 备注
);

create table overTime -- 加班表
(
    id            text primary key, -- 加班 id 软件 生成 uuid4
    name          text,             -- 加班名称
    unit          text,             -- 计算单位 （d 天，h 小时）
    status        int,              -- 当前状态 （0 禁用，1 启用）
    defaultNumber int,              -- 默认加班数，根据计算单位决定
    description   text              -- 备注
);

create table overTimeLog -- 加班记录表
(
    id          text primary key,                            -- 记录 id 软件 生成 uuid4
    personnelId text,                                        -- 人员 id
    holidayId   text,                                        -- 假期 id
    overTimeId  text,                                        -- 加班 id
    logTime     text default (datetime('now', 'localtime')), -- 日志日期
    description text                                         -- 备注
);

create table leaveTime -- 休假表
(
    id          text primary key, -- 休假 id 软件 生成 uuid4
    name        text,             -- 休假名称
    unit        text,             -- 计算单位 （d 天，h 小时）
    status      int,              -- 当前状态 （0 禁用，1 启用）
    description text              -- 备注
);

create table leaveTimeLog -- 加班记录表
(
    id          text primary key,                            -- 记录 id 软件 生成 uuid4
    personnelId text,                                        -- 人员 id
    holidayId   text,                                        -- 假期 id
    leaveTimeId text,                                        -- 休假 id
    number      int,                                         -- 休假计数
    logTime     text default (datetime('now', 'localtime')), -- 日志日期
    description text                                         -- 备注
);
