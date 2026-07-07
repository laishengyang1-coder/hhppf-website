(function () {
  "use strict";

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const STORAGE_KEY = "hhWarrantyPortalV1";
  const VERSION = 1;
  const AUTH = {
    dealer: {
      email: "dealer@hhppf.com",
      password: "dealer123",
      sessionKey: "hhDealerAuthed",
      dashboardRoute: "dealer/dashboard",
      loginRoute: "dealer/login",
    },
    admin: {
      email: "admin@hhppf.com",
      password: "admin123",
      sessionKey: "hhAdminAuthed",
      dashboardRoute: "admin/dashboard",
      loginRoute: "admin/login",
    },
  };

  const copy = {
    en: {
      home: "Warranty",
      verify: "Verify",
      terms: "Terms",
      dealer: "Dealer Portal",
      admin: "Admin",
      language: "Language",
      back: "hhppf.com",
      heroTitle: "H&H Warranty & Partner Points System",
      heroLead:
        "A V1 portal for overseas owner verification, dealer warranty registration, HQ review, partner points, and rewards workflows.",
      ownerQuery: "Owner VIN Verification",
      dealerLogin: "Dealer Login",
      adminLogin: "Admin Login",
    },
    zh: {
      home: "电子质保",
      verify: "车主查询",
      terms: "质保条款",
      dealer: "经销商端",
      admin: "总部后台",
      language: "语言",
      back: "返回官网",
      heroTitle: "H&H 电子质保与伙伴积分系统",
      heroLead:
        "面向海外市场的 V1 门户原型，覆盖车主查询、经销商登记、总部审核、积分和物料兑换。",
      ownerQuery: "车主 VIN 查询",
      dealerLogin: "经销商登录",
      adminLogin: "总部登录",
    },
    ru: {
      home: "Гарантия",
      verify: "Проверка VIN",
      terms: "Условия",
      dealer: "Портал дилера",
      admin: "Админ",
      language: "Язык",
      back: "hhppf.com",
      heroTitle: "Система гарантии и партнерских баллов H&H",
      heroLead:
        "Прототип V1 для проверки гарантии, регистрации дилером, проверки штаб-квартирой, партнерских баллов и заявок на материалы.",
      ownerQuery: "Проверка по VIN",
      dealerLogin: "Вход дилера",
      adminLogin: "Вход администратора",
    },
  };

  const exactText = {
    zh: {
      "Warranty System": "质保系统",
      "Warranty Registration & Verification": "质保登记与查询",
      "Owner Portal": "车主端",
      "Verify H&H warranty by VIN.": "通过 VIN 查询 H&H 质保。",
      "VIN / Vehicle Identification Number": "VIN / 车架号",
      "Search Warranty": "查询质保",
      "Use Sample VIN": "使用示例 VIN",
      "One VIN can return multiple approved H&H warranty records across PPF, window film, color film, and partial warranty cases.": "一个 VIN 可以返回多条已审核通过的 H&H 质保记录，包括车衣、窗膜、改色膜和局部质保。",
      "V1 Business Flow": "V1 业务流程",
      "From factory code to active certificate.": "从工厂质保码到有效电子证书。",
      "HQ imports factory warranty codes and allocates them to authorized dealers.": "总部导入工厂质保码，并划拨给授权经销商。",
      "Dealer registers VIN, vehicle, installation category, and delivery photos.": "经销商登记 VIN、车辆、施工类别和交付照片。",
      "HQ reviews the submission, activates warranty, generates certificate, and awards points.": "总部审核资料，激活质保，生成证书并发放积分。",
      "Owner verifies by VIN and downloads the warranty certificate.": "车主通过 VIN 查询并下载质保证书。",
      "Dealer spends partner points in the Rewards Center.": "经销商在积分兑换中心使用伙伴积分。",
      "Warranty codes in system": "系统质保码",
      "Active warranty records": "有效质保记录",
      "Pending HQ reviews": "总部待审核",
      "Reward items configured": "已配置兑换物料",
      "Owner Verification": "车主查询",
      "Owners search by VIN. One vehicle can return multiple H&H warranty records, such as PPF, window film, and color film.": "车主通过 VIN 查询。同一辆车可以返回多条 H&H 质保记录，例如车衣、窗膜和改色膜。",
      "Try VIN XTA210990R1234567": "试用 VIN XTA210990R1234567",
      "Dealer Operations": "经销商操作",
      "Dealers can register warranties, upload photos, view records, review points, and request H&H materials.": "经销商可以登记质保、上传照片、查看记录、查看积分并申请 H&H 物料。",
      "Open dealer portal": "打开经销商端",
      "HQ Control": "总部管控",
      "HQ manages products, dealers, warranty code import and allocation, reviews, points, rewards, and exports.": "总部管理产品、经销商、质保码导入与划拨、审核、积分、兑换和导出。",
      "Open admin console": "打开总部后台",
      "Warranty Code Rule": "质保码规则",
      "Factory warranty code equals system warranty code and certificate number.": "工厂质保码即系统质保码和质保证书编号。",
      "Window Film Usage": "窗膜使用次数",
      "Multi-use codes support usage limit, used count, and remaining count.": "多次使用质保码支持可用次数、已用次数和剩余次数。",
      "Photo Storage": "图片存储",
      "Production design stores image paths in D1 and image files in Cloudflare R2.": "生产环境设计为 D1 保存图片路径，Cloudflare R2 保存图片文件。",
      "Points Loop": "积分闭环",
      "Points are awarded only after HQ approval, then used for reward requests.": "积分只在总部审核通过后发放，并用于物料兑换申请。",
      "Invalid dealer account or password.": "经销商账号或密码不正确。",
      "Invalid admin account or password.": "总部账号或密码不正确。",
      "Log out": "退出登录",
      "Enter a VIN to view active H&H warranty records and certificate details. Web pages mask the VIN; printable certificates show the full VIN.": "输入 VIN 查看有效的 H&H 质保记录和证书详情。网页端会脱敏显示 VIN，打印证书显示完整 VIN。",
      "No active H&H warranty record found": "未找到有效的 H&H 质保记录",
      "Please check the VIN or contact the authorized dealer that installed the film.": "请检查 VIN，或联系为车辆施工的授权经销商。",
      "Product Type": "产品类型",
      "Product Name": "产品名称",
      "Installation": "施工",
      "Installation Category": "施工类别",
      "Date": "日期",
      "Status": "状态",
      "Action": "操作",
      "View": "查看",
      "Download PDF": "下载 PDF",
      "H&H Warranty Certificate": "H&H 质保证书",
      "Warranty Certificate": "质保证书",
      "Customer Name": "车主姓名",
      "Vehicle": "车辆",
      "Vehicle Make": "车辆品牌",
      "Vehicle Model": "车型",
      "Vehicle Year": "年份",
      "Installation Date": "安装日期",
      "Warranty Expiry Date": "质保到期日",
      "Authorized Dealer": "授权经销商",
      "Country / City": "国家 / 城市",
      "Verification Link": "查询链接",
      "For full warranty terms and limitations, please visit the official H&H Warranty Terms page.": "完整质保条款和限制，请访问 H&H 官方质保条款页面。",
      "Print / Save PDF": "打印 / 保存 PDF",
      "View Warranty Terms": "查看质保条款",
      "Warranty Terms": "质保条款",
      "H&H Warranty Terms": "H&H 质保条款",
      "This V1 terms page keeps the full legal content outside the PDF certificate and gives owners one stable online reference.": "V1 条款页将完整法律条款放在 PDF 之外，为车主提供一个稳定的线上参考页面。",
      "Coverage Summary": "覆盖范围摘要",
      "Coverage depends on product type, product series, installation category, installation date, approved warranty code, and the authorized dealer record.": "质保范围取决于产品类型、产品系列、施工类别、安装日期、已审核通过的质保码和授权经销商记录。",
      "Verification Rule": "查询规则",
      "Factory warranty code is the only warranty code. The same code is used for factory traceability, dealer registration, HQ review, owner query, PDF certificate, and export.": "工厂质保码是唯一质保编号，同一编号用于工厂追溯、经销商登记、总部审核、车主查询、PDF 证书和数据导出。",
      "Owner Data Privacy": "车主数据隐私",
      "The public web certificate masks VIN and contact fields. Printable PDF certificates can include the full VIN for after-sales and insurance communication.": "公开网页证书会脱敏显示 VIN 和联系方式；可打印 PDF 证书可包含完整 VIN，用于售后和保险沟通。",
      "Limitations": "限制说明",
      "Final warranty limitations should be reviewed by H&H and local legal counsel before production launch in each country.": "正式上线前，H&H 和当地法律顾问应根据各国市场复核最终质保限制。",
      "Dealer Portal": "经销商端",
      "Dealer Login": "经销商登录",
      "Demo account": "演示账号",
      "Email or account name": "邮箱或账号名",
      "Password": "密码",
      "Enter Dealer Portal": "进入经销商端",
      "Register Warranty": "登记质保",
      "Warranty Records": "质保记录",
      "My Points": "我的积分",
      "Rewards Center": "积分兑换中心",
      "Demo dealer workspace for warranty registration, record tracking, points, and material redemption.": "经销商演示工作台，用于质保登记、记录跟踪、积分和物料兑换。",
      "Dashboard": "看板",
      "Available points": "可用积分",
      "Pending review": "待审核",
      "Active warranties": "有效质保",
      "Usable warranty codes": "可用质保码",
      "Select an allocated warranty code, fill vehicle information, and submit photos for HQ review.": "选择已划拨的质保码，填写车辆信息，并提交照片给总部审核。",
      "Start registration": "开始登记",
      "Review pending, active, and rejected records submitted by this dealer account.": "查看该经销商账号提交的待审核、已生效和已驳回记录。",
      "View records": "查看记录",
      "Use partner points for workwear, caps, color cards, sample books, and tools.": "使用伙伴积分兑换工服、帽子、色卡、样册和施工工具。",
      "Redeem materials": "兑换物料",
      "Product type, product name, warranty years, and usage rules are filled from the selected factory warranty code.": "产品类型、产品名称、质保年限和使用规则会根据所选工厂质保码自动带出。",
      "Warranty Code": "质保码",
      "Installation Photo - 1 to 3 photos": "施工照片 - 1 至 3 张",
      "Production upload should compress images to 500KB-1MB, max 1600px longest edge, then store files in Cloudflare R2.": "生产环境上传前应将图片压缩至 500KB-1MB，最长边不超过 1600px，并存储到 Cloudflare R2。",
      "Remark": "备注",
      "Submit for Review": "提交审核",
      "Current points": "当前积分",
      "Total points": "总积分",
      "Frozen in review": "审核中冻结",
      "Available balance": "可用余额",
      "Validity months reserved": "预留有效期月份",
      "Points Ledger": "积分流水",
      "Inventory quantity is managed by HQ but not shown to dealers.": "库存数量由总部管理，但不在经销商端显示。",
      "Request Redemption": "申请兑换",
      "HQ Admin": "总部管理员",
      "Admin Login": "总部登录",
      "Enter Admin Console": "进入总部后台",
      "HQ Admin Console": "总部后台",
      "Warranty Operations": "质保运营",
      "Central control for product setup, dealer setup, code import, allocation, review, points, reward inventory, and exports.": "集中管理产品、经销商、质保码导入、划拨、审核、积分、兑换库存和数据导出。",
      "Products": "产品",
      "Dealers": "经销商",
      "Warranty Codes": "质保码",
      "Import": "导入",
      "Allocation": "划拨",
      "Reviews": "审核",
      "Points": "积分",
      "Rewards": "兑换物料",
      "Redemptions": "兑换申请",
      "Export": "导出",
      "Total warranty records": "质保记录总数",
      "Pending reviews": "待审核记录",
      "Points issued": "已发放积分",
      "Redemption requests": "兑换申请",
      "Dealer Ranking": "经销商排名",
      "Product Type Split": "产品类型分布",
      "Product Management": "产品库管理",
      "Products define default warranty years, usage type, and usage limit. Dealers cannot edit product information during warranty registration.": "产品库定义默认质保年限、使用类型和使用次数。经销商登记质保时不能修改产品信息。",
      "Dealer Management": "经销商管理",
      "Warranty Code Management": "质保码管理",
      "Factory warranty code is the system warranty code and certificate number.": "工厂质保码即系统质保码和证书编号。",
      "Excel Import": "Excel 导入",
      "V1 production should reject the whole file when any row has a duplicate code, missing required field, invalid product, invalid dealer code, or invalid usage setting.": "生产版 V1 中，只要任一行存在质保码重复、必填字段缺失、产品无效、经销商无效或使用设置无效，整份文件都应拒绝导入。",
      "Download CSV Template": "下载 CSV 模板",
      "Run Validation Demo": "运行校验演示",
      "Import Batches": "导入批次",
      "Warranty Code Allocation": "质保码划拨",
      "Allocate by import batch, shipment batch, product type, code range, or selected warranty codes. This preview supports selected unallocated codes.": "可按导入批次、发货批次、产品类型、质保码范围或选中质保码划拨。本原型支持选中未划拨质保码后划拨。",
      "Dealer": "经销商",
      "Allocate Selected Code": "划拨选中质保码",
      "Warranty Review": "质保审核",
      "Approval activates the warranty, calculates expiry date, generates the certificate, awards dealer points, and updates window-film usage count.": "审核通过会激活质保、计算到期日、生成证书、发放经销商积分，并更新窗膜使用次数。",
      "Approve": "通过",
      "Reject": "驳回",
      "No pending reviews right now.": "当前没有待审核记录。",
      "Points Settings": "积分设置",
      "Default Warranty Approval Points": "默认质保审核积分",
      "Reserved Validity Months": "预留有效期月份",
      "Save Settings": "保存设置",
      "Manual Points Adjustment": "人工积分调整",
      "Points Change": "积分变动",
      "Reason": "原因",
      "Apply Adjustment": "确认调整",
      "Rewards Management": "兑换物料管理",
      "HQ controls points cost and internal inventory. Dealer-facing portal only shows Available, Out of Stock, or Coming Soon.": "总部控制所需积分和内部库存。经销商端只显示可申请兑换、暂不可兑换或即将上线。",
      "Change Status": "切换状态",
      "Redemption Requests": "兑换申请",
      "Data Export": "数据导出",
      "Production export should generate Excel files. This static preview downloads CSV files with the same field groups.": "生产环境应导出 Excel 文件。本静态原型会下载字段组相同的 CSV 文件。",
      "Export Warranty Records": "导出质保记录",
      "Export Points Ledger": "导出积分流水",
      "Export Redemption Requests": "导出兑换申请",
      "Reset demo data": "重置演示数据",
      "Main website": "主官网",
      "H&H Warranty & Partner Points System V1 Preview": "H&H 电子质保与伙伴积分系统 V1 原型",
      "Future deployment target: warranty.hhppf.com -": "未来部署目标：warranty.hhppf.com -",
      "Type": "类型",
      "Name": "名称",
      "Years": "年限",
      "Usage": "使用",
      "Limit": "次数上限",
      "Code": "编号",
      "Install Date": "安装日期",
      "Expiry": "到期日",
      "Pending": "待审核",
      "Batch": "批次",
      "Time": "时间",
      "Operator": "操作人",
      "Total": "总数",
      "Country": "国家",
      "City": "城市",
      "Level": "级别",
      "Parent": "上级",
      "Records": "记录数",
      "Change": "变动",
      "Reward": "兑换物料",
      "Qty": "数量",
      "Category": "类别",
      "Workwear": "工服 / 帽子",
      "Sample Material": "色卡 / 样册",
      "Tools": "施工工具",
      "Available for Redemption": "可申请兑换",
      "Out of Stock": "暂不可兑换",
      "Coming Soon": "即将上线",
      "Active": "有效",
      "Allocated": "已划拨",
      "Unallocated": "未划拨",
      "Rejected": "已驳回",
      "Exhausted": "已用完",
      "Imported": "已导入",
      "Reserved": "预留",
      "Approved, Waiting for Next Shipment": "已通过，等待下批发货",
      "Shipped with Order": "已随货发出",
      "PPF": "车衣 PPF",
      "Window Film": "汽车窗膜",
      "TPU Color PPF": "TPU 改色膜",
      "Manual / Partial": "手动 / 局部质保",
      "Full Car PPF": "整车车衣",
      "Partial PPF": "局部车衣",
      "Single": "单次使用",
      "Multi": "多次使用",
      "Owner name": "车主姓名",
      "17-character VIN": "17 位 VIN",
      "Example: XTA210990R1234567": "示例：XTA210990R1234567",
      "Any special note for HQ review": "给总部审核的特殊备注",
      "Campaign activity reward": "活动奖励",
    },
    ru: {
      "Warranty System": "Система гарантии",
      "Warranty Registration & Verification": "Регистрация и проверка гарантии",
      "Owner Portal": "Портал владельца",
      "Verify H&H warranty by VIN.": "Проверьте гарантию H&H по VIN.",
      "VIN / Vehicle Identification Number": "VIN / идентификационный номер",
      "Search Warranty": "Проверить гарантию",
      "Use Sample VIN": "Использовать пример VIN",
      "One VIN can return multiple approved H&H warranty records across PPF, window film, color film, and partial warranty cases.": "Один VIN может вернуть несколько одобренных записей H&H: PPF, оконная пленка, цветная пленка и частичная гарантия.",
      "V1 Business Flow": "Бизнес-процесс V1",
      "From factory code to active certificate.": "От заводского кода к действующему сертификату.",
      "HQ imports factory warranty codes and allocates them to authorized dealers.": "Штаб-квартира импортирует заводские гарантийные коды и распределяет их дилерам.",
      "Dealer registers VIN, vehicle, installation category, and delivery photos.": "Дилер регистрирует VIN, автомобиль, категорию установки и фото передачи.",
      "HQ reviews the submission, activates warranty, generates certificate, and awards points.": "Штаб-квартира проверяет заявку, активирует гарантию, создает сертификат и начисляет баллы.",
      "Owner verifies by VIN and downloads the warranty certificate.": "Владелец проверяет по VIN и скачивает гарантийный сертификат.",
      "Dealer spends partner points in the Rewards Center.": "Дилер использует партнерские баллы в центре вознаграждений.",
      "Warranty codes in system": "Гарантийных кодов в системе",
      "Active warranty records": "Активные гарантии",
      "Pending HQ reviews": "На проверке HQ",
      "Reward items configured": "Настроенные материалы",
      "Owner Verification": "Проверка владельца",
      "Owners search by VIN. One vehicle can return multiple H&H warranty records, such as PPF, window film, and color film.": "Владельцы ищут по VIN. Один автомобиль может иметь несколько гарантий H&H, например PPF, оконную и цветную пленку.",
      "Try VIN XTA210990R1234567": "Попробовать VIN XTA210990R1234567",
      "Dealer Operations": "Операции дилера",
      "Dealers can register warranties, upload photos, view records, review points, and request H&H materials.": "Дилеры могут регистрировать гарантии, загружать фото, смотреть записи, баллы и запрашивать материалы H&H.",
      "Open dealer portal": "Открыть портал дилера",
      "HQ Control": "Управление HQ",
      "Open admin console": "Открыть админ-панель",
      "Warranty Code Rule": "Правило гарантийного кода",
      "Factory warranty code equals system warranty code and certificate number.": "Заводской гарантийный код равен системному коду и номеру сертификата.",
      "Window Film Usage": "Использование оконной пленки",
      "Multi-use codes support usage limit, used count, and remaining count.": "Многоразовые коды поддерживают лимит, использованные и оставшиеся применения.",
      "Photo Storage": "Хранение фото",
      "Production design stores image paths in D1 and image files in Cloudflare R2.": "В продакшене D1 хранит пути к изображениям, а файлы изображений хранятся в Cloudflare R2.",
      "Points Loop": "Цикл баллов",
      "Points are awarded only after HQ approval, then used for reward requests.": "Баллы начисляются только после одобрения HQ и затем используются для заявок на материалы.",
      "Invalid dealer account or password.": "Неверный аккаунт или пароль дилера.",
      "Invalid admin account or password.": "Неверный аккаунт или пароль администратора.",
      "Log out": "Выйти",
      "Enter a VIN to view active H&H warranty records and certificate details. Web pages mask the VIN; printable certificates show the full VIN.": "Введите VIN, чтобы увидеть активные гарантии H&H и детали сертификата. На сайте VIN маскируется; в печатном сертификате показан полный VIN.",
      "No active H&H warranty record found": "Активная гарантия H&H не найдена",
      "Please check the VIN or contact the authorized dealer that installed the film.": "Проверьте VIN или свяжитесь с авторизованным дилером, который выполнял установку.",
      "Product Type": "Тип продукта",
      "Product Name": "Название продукта",
      "Installation": "Установка",
      "Installation Category": "Категория установки",
      "Date": "Дата",
      "Status": "Статус",
      "Action": "Действие",
      "View": "Открыть",
      "Download PDF": "Скачать PDF",
      "H&H Warranty Certificate": "Гарантийный сертификат H&H",
      "Warranty Certificate": "Гарантийный сертификат",
      "Customer Name": "Имя клиента",
      "Vehicle": "Автомобиль",
      "Vehicle Make": "Марка автомобиля",
      "Vehicle Model": "Модель автомобиля",
      "Vehicle Year": "Год автомобиля",
      "Installation Date": "Дата установки",
      "Warranty Expiry Date": "Дата окончания гарантии",
      "Authorized Dealer": "Авторизованный дилер",
      "Country / City": "Страна / город",
      "Verification Link": "Ссылка проверки",
      "For full warranty terms and limitations, please visit the official H&H Warranty Terms page.": "Полные условия и ограничения гарантии смотрите на официальной странице условий гарантии H&H.",
      "Print / Save PDF": "Печать / сохранить PDF",
      "View Warranty Terms": "Условия гарантии",
      "Warranty Terms": "Условия гарантии",
      "H&H Warranty Terms": "Условия гарантии H&H",
      "This V1 terms page keeps the full legal content outside the PDF certificate and gives owners one stable online reference.": "Страница условий V1 хранит полный юридический текст отдельно от PDF-сертификата и дает владельцам стабильную онлайн-ссылку.",
      "Coverage Summary": "Краткое покрытие",
      "Coverage depends on product type, product series, installation category, installation date, approved warranty code, and the authorized dealer record.": "Покрытие зависит от типа продукта, серии, категории установки, даты установки, одобренного гарантийного кода и записи авторизованного дилера.",
      "Verification Rule": "Правило проверки",
      "Factory warranty code is the only warranty code. The same code is used for factory traceability, dealer registration, HQ review, owner query, PDF certificate, and export.": "Заводской гарантийный код является единственным гарантийным кодом. Он используется для прослеживаемости, регистрации дилером, проверки HQ, запроса владельца, PDF-сертификата и экспорта.",
      "Owner Data Privacy": "Конфиденциальность данных",
      "The public web certificate masks VIN and contact fields. Printable PDF certificates can include the full VIN for after-sales and insurance communication.": "Публичный веб-сертификат маскирует VIN и контактные поля. Печатный PDF может содержать полный VIN для сервиса и страховых коммуникаций.",
      "Limitations": "Ограничения",
      "Final warranty limitations should be reviewed by H&H and local legal counsel before production launch in each country.": "Финальные ограничения гарантии должны быть проверены H&H и местными юристами перед запуском в каждой стране.",
      "Dealer Portal": "Портал дилера",
      "Dealer Login": "Вход дилера",
      "Authorized dealers register warranties, upload installation photos, track review status, and redeem partner points.": "Авторизованные дилеры регистрируют гарантии, загружают фото установки, отслеживают статус проверки и обменивают партнерские баллы.",
      "Demo account": "Демо-аккаунт",
      "Email or account name": "Email или логин",
      "Password": "Пароль",
      "Enter Dealer Portal": "Войти в портал дилера",
      "Register Warranty": "Регистрация гарантии",
      "Warranty Records": "Записи гарантии",
      "My Points": "Мои баллы",
      "Rewards Center": "Центр вознаграждений",
      "Dashboard": "Панель",
      "Demo dealer workspace for warranty registration, record tracking, points, and material redemption.": "Демо-рабочее место дилера для регистрации гарантии, отслеживания записей, баллов и обмена материалов.",
      "Available points": "Доступные баллы",
      "Pending review": "На проверке",
      "Active warranties": "Активные гарантии",
      "Usable warranty codes": "Доступные коды",
      "Start registration": "Начать регистрацию",
      "Select an allocated warranty code, fill vehicle information, and submit photos for HQ review.": "Выберите назначенный гарантийный код, заполните данные автомобиля и отправьте фото на проверку HQ.",
      "View records": "Смотреть записи",
      "Review pending, active, and rejected records submitted by this dealer account.": "Просматривайте ожидающие, активные и отклоненные записи, отправленные этим дилерским аккаунтом.",
      "Redeem materials": "Обменять материалы",
      "Use partner points for workwear, caps, color cards, sample books, and tools.": "Используйте партнерские баллы для рабочей одежды, кепок, цветовых карт, каталогов образцов и инструментов.",
      "Product type, product name, warranty years, and usage rules are filled from the selected factory warranty code.": "Тип продукта, название, срок гарантии и правила использования заполняются из выбранного заводского гарантийного кода.",
      "Warranty Code": "Гарантийный код",
      "Installation Photo - 1 to 3 photos": "Фото установки - от 1 до 3",
      "Production upload should compress images to 500KB-1MB, max 1600px longest edge, then store files in Cloudflare R2.": "В продакшене изображения нужно сжимать до 500KB-1MB, максимум 1600px по длинной стороне, затем хранить файлы в Cloudflare R2.",
      "Remark": "Примечание",
      "Submit for Review": "Отправить на проверку",
      "Total points": "Всего баллов",
      "Frozen in review": "Заморожено на проверке",
      "Available balance": "Доступный баланс",
      "Validity months reserved": "Месяцы действия зарезервированы",
      "Points Ledger": "Журнал баллов",
      "Inventory quantity is managed by HQ but not shown to dealers.": "Количество на складе управляется HQ, но не показывается дилерам.",
      "Request Redemption": "Запросить обмен",
      "HQ Admin": "Админ HQ",
      "Admin Login": "Вход администратора",
      "Enter Admin Console": "Войти в админ-панель",
      "HQ Admin Console": "Админ-панель HQ",
      "Warranty Operations": "Операции гарантии",
      "Central control for product setup, dealer setup, code import, allocation, review, points, reward inventory, and exports.": "Централизованное управление продуктами, дилерами, импортом кодов, распределением, проверками, баллами, складом материалов и экспортом.",
      "Products": "Продукты",
      "Dealers": "Дилеры",
      "Warranty Codes": "Коды гарантии",
      "Import": "Импорт",
      "Allocation": "Распределение",
      "Reviews": "Проверки",
      "Points": "Баллы",
      "Rewards": "Материалы",
      "Redemptions": "Заявки",
      "Export": "Экспорт",
      "Total warranty records": "Всего гарантий",
      "Pending reviews": "Ожидают проверки",
      "Points issued": "Начислено баллов",
      "Redemption requests": "Заявки на обмен",
      "Dealer Ranking": "Рейтинг дилеров",
      "Product Type Split": "Разбивка по продуктам",
      "Product Management": "Управление продуктами",
      "Products define default warranty years, usage type, and usage limit. Dealers cannot edit product information during warranty registration.": "Продукты задают срок гарантии по умолчанию, тип использования и лимит. Дилеры не могут изменять данные продукта при регистрации гарантии.",
      "Dealer Management": "Управление дилерами",
      "Warranty Code Management": "Управление кодами",
      "Excel Import": "Импорт Excel",
      "V1 production should reject the whole file when any row has a duplicate code, missing required field, invalid product, invalid dealer code, or invalid usage setting.": "В продакшене V1 весь файл должен отклоняться, если любая строка содержит дубликат кода, пустое обязательное поле, неверный продукт, неверный код дилера или неверные настройки использования.",
      "Download CSV Template": "Скачать CSV-шаблон",
      "Run Validation Demo": "Запустить демо-проверку",
      "Import Batches": "Партии импорта",
      "Warranty Code Allocation": "Распределение кодов",
      "Allocate by import batch, shipment batch, product type, code range, or selected warranty codes. This preview supports selected unallocated codes.": "Распределяйте по партии импорта, партии отгрузки, типу продукта, диапазону кодов или выбранным кодам. В этом прототипе поддержаны выбранные неназначенные коды.",
      "Dealer": "Дилер",
      "Allocate Selected Code": "Назначить выбранный код",
      "Warranty Review": "Проверка гарантии",
      "Approval activates the warranty, calculates expiry date, generates the certificate, awards dealer points, and updates window-film usage count.": "Одобрение активирует гарантию, рассчитывает дату окончания, создает сертификат, начисляет баллы дилеру и обновляет счетчик оконной пленки.",
      "Approve": "Одобрить",
      "Reject": "Отклонить",
      "No pending reviews right now.": "Сейчас нет записей на проверке.",
      "Points Settings": "Настройки баллов",
      "Default Warranty Approval Points": "Баллы за одобрение гарантии",
      "Reserved Validity Months": "Зарезервированные месяцы действия",
      "Save Settings": "Сохранить",
      "Manual Points Adjustment": "Ручная корректировка баллов",
      "Points Change": "Изменение баллов",
      "Reason": "Причина",
      "Apply Adjustment": "Применить",
      "Rewards Management": "Управление материалами",
      "HQ controls points cost and internal inventory. Dealer-facing portal only shows Available, Out of Stock, or Coming Soon.": "HQ управляет стоимостью в баллах и внутренним складом. Портал дилера показывает только доступно, нет в наличии или скоро.",
      "Change Status": "Изменить статус",
      "Redemption Requests": "Заявки на обмен",
      "Data Export": "Экспорт данных",
      "Production export should generate Excel files. This static preview downloads CSV files with the same field groups.": "В продакшене экспорт должен создавать Excel-файлы. Этот статический прототип скачивает CSV с теми же группами полей.",
      "Export Warranty Records": "Экспорт гарантий",
      "Export Points Ledger": "Экспорт журнала баллов",
      "Export Redemption Requests": "Экспорт заявок",
      "Reset demo data": "Сбросить демо-данные",
      "Main website": "Основной сайт",
      "H&H Warranty & Partner Points System V1 Preview": "Прототип V1 системы гарантии и баллов H&H",
      "Future deployment target: warranty.hhppf.com -": "Будущий адрес: warranty.hhppf.com -",
      "Type": "Тип",
      "Name": "Название",
      "Years": "Лет",
      "Usage": "Использование",
      "Limit": "Лимит",
      "Code": "Код",
      "Install Date": "Дата установки",
      "Expiry": "Окончание",
      "Pending": "Ожидает",
      "Batch": "Партия",
      "Time": "Время",
      "Operator": "Оператор",
      "Total": "Всего",
      "Country": "Страна",
      "City": "Город",
      "Level": "Уровень",
      "Parent": "Родитель",
      "Records": "Записи",
      "Change": "Изменение",
      "Reward": "Материал",
      "Qty": "Кол-во",
      "Category": "Категория",
      "Workwear": "Одежда",
      "Sample Material": "Образцы",
      "Tools": "Инструменты",
      "Available for Redemption": "Доступно для обмена",
      "Out of Stock": "Нет в наличии",
      "Coming Soon": "Скоро",
      "Active": "Активна",
      "Allocated": "Назначен",
      "Unallocated": "Не назначен",
      "Rejected": "Отклонена",
      "Exhausted": "Исчерпан",
      "Imported": "Импортировано",
      "Reserved": "Зарезервировано",
      "Approved, Waiting for Next Shipment": "Одобрено, ожидает следующей отгрузки",
      "Shipped with Order": "Отправлено с заказом",
      "PPF": "PPF",
      "Window Film": "Оконная пленка",
      "TPU Color PPF": "TPU цветная PPF",
      "Manual / Partial": "Ручная / частичная",
      "Full Car PPF": "Полная PPF",
      "Partial PPF": "Частичная PPF",
      "Single": "Однократно",
      "Multi": "Многократно",
      "Owner name": "Имя владельца",
      "17-character VIN": "17-значный VIN",
      "Example: XTA210990R1234567": "Пример: XTA210990R1234567",
      "Any special note for HQ review": "Примечание для проверки HQ",
      "Campaign activity reward": "Бонус за активность",
    },
  };

  const phraseText = {
    zh: {
      "active records found for": "条有效质保记录，对应",
      "active record found for": "条有效质保记录，对应",
      "points per item": "积分 / 件",
      "Product:": "产品：",
      "Warranty Years:": "质保年限：",
      "Usage:": "使用规则：",
      "remaining": "剩余",
      "Dealer:": "经销商：",
      "Photos:": "照片：",
      "Checklist: valid code, allocated dealer, VIN filled, product match, photo uploaded, remaining uses": "检查项：质保码有效、经销商匹配、VIN 已填、产品匹配、已上传图片、剩余次数",
      "notes reviewed.": "备注已检查。",
      "Available points:": "可用积分：",
    },
    ru: {
      "active records found for": "активных записей найдено для",
      "active record found for": "активная запись найдена для",
      "points per item": "баллов за единицу",
      "Product:": "Продукт:",
      "Warranty Years:": "Лет гарантии:",
      "Usage:": "Использование:",
      "remaining": "осталось",
      "Dealer:": "Дилер:",
      "Photos:": "Фото:",
      "Checklist: valid code, allocated dealer, VIN filled, product match, photo uploaded, remaining uses": "Проверка: код действителен, дилер назначен, VIN заполнен, продукт совпадает, фото загружено, осталось использований",
      "notes reviewed.": "примечания проверены.",
      "Available points:": "Доступные баллы:",
    },
  };

  const seedData = {
    version: VERSION,
    settings: {
      defaultWarrantyPoints: 100,
      pointsValidityMonths: 12,
    },
    products: [
      {
        type: "PPF",
        name: "Ultra Clear PPF",
        warrantyYears: 10,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Premium full-car paint protection film.",
      },
      {
        type: "WINDOW_FILM",
        name: "Ceramic Window Film",
        warrantyYears: 7,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Default 24 uses per warranty code.",
      },
      {
        type: "TPU_COLOR_PPF",
        name: "Satin TPU Color PPF",
        warrantyYears: 5,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "One vehicle per warranty code.",
      },
      {
        type: "MANUAL_PARTIAL",
        name: "Manual Partial Warranty",
        warrantyYears: 2,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Reserved",
        remark: "HQ manual handling for repairs, short-meter use, and partial installs.",
      },
    ],
    dealers: [
      {
        code: "RU-MSK-001",
        name: "Moscow Auto Studio",
        country: "Russia",
        city: "Moscow",
        level: "Country Partner",
        status: "Active",
        points: 860,
        parentCode: "HQ",
      },
      {
        code: "RU-SPB-002",
        name: "Saint Petersburg Detail Lab",
        country: "Russia",
        city: "Saint Petersburg",
        level: "Regional Dealer",
        status: "Active",
        points: 340,
        parentCode: "RU-MSK-001",
      },
    ],
    warrantyCodes: [
      {
        code: "HH-PPF-2026-0001",
        factoryRollNo: "FR-PPF-8891",
        batchNo: "B-PPF-2026-07",
        shipmentNo: "HH-RU-2026-07-A",
        productType: "PPF",
        productName: "Ultra Clear PPF",
        warrantyYears: 10,
        usageType: "Single",
        usageLimit: 1,
        usedCount: 1,
        dealerCode: "RU-MSK-001",
        importBatch: "IMP-2026-0706-A",
        status: "Active",
        remark: "Factory code used as certificate number.",
      },
      {
        code: "HH-WF-2026-0008",
        factoryRollNo: "FR-WF-1018",
        batchNo: "B-WF-2026-07",
        shipmentNo: "HH-RU-2026-07-A",
        productType: "WINDOW_FILM",
        productName: "Ceramic Window Film",
        warrantyYears: 7,
        usageType: "Multi",
        usageLimit: 24,
        usedCount: 3,
        dealerCode: "RU-MSK-001",
        importBatch: "IMP-2026-0706-A",
        status: "Allocated",
        remark: "21 uses remaining.",
      },
      {
        code: "HH-TPU-2026-0012",
        factoryRollNo: "FR-TPU-4410",
        batchNo: "B-TPU-2026-07",
        shipmentNo: "HH-RU-2026-07-B",
        productType: "TPU_COLOR_PPF",
        productName: "Satin TPU Color PPF",
        warrantyYears: 5,
        usageType: "Single",
        usageLimit: 1,
        usedCount: 0,
        dealerCode: "RU-MSK-001",
        importBatch: "IMP-2026-0706-B",
        status: "Allocated",
        remark: "",
      },
      {
        code: "HH-PPF-2026-0044",
        factoryRollNo: "FR-PPF-8910",
        batchNo: "B-PPF-2026-07",
        shipmentNo: "",
        productType: "PPF",
        productName: "Ultra Clear PPF",
        warrantyYears: 10,
        usageType: "Single",
        usageLimit: 1,
        usedCount: 0,
        dealerCode: "",
        importBatch: "IMP-2026-0706-C",
        status: "Unallocated",
        remark: "Ready for manual allocation.",
      },
    ],
    warrantyRecords: [
      {
        id: "WR-2026-0001",
        warrantyCode: "HH-PPF-2026-0001",
        vin: "XTA210990R1234567",
        customerName: "Alex Petrov",
        vehicleMake: "BMW",
        vehicleModel: "X5",
        vehicleYear: "2024",
        productType: "PPF",
        productName: "Ultra Clear PPF",
        installationCategory: "FULL_CAR_PPF",
        installationDate: "2026-07-10",
        warrantyExpiryDate: "2036-07-10",
        dealerCode: "RU-MSK-001",
        dealerName: "Moscow Auto Studio",
        country: "Russia",
        city: "Moscow",
        status: "Active",
        photos: ["Delivery photo", "Hood detail"],
        reviewNote: "Approved by HQ.",
        pointsAwarded: 100,
      },
      {
        id: "WR-2026-0002",
        warrantyCode: "HH-WF-2026-0008",
        vin: "XTA210990R1234567",
        customerName: "Alex Petrov",
        vehicleMake: "BMW",
        vehicleModel: "X5",
        vehicleYear: "2024",
        productType: "WINDOW_FILM",
        productName: "Ceramic Window Film",
        installationCategory: "WINDOW_FILM",
        installationDate: "2026-07-10",
        warrantyExpiryDate: "2033-07-10",
        dealerCode: "RU-MSK-001",
        dealerName: "Moscow Auto Studio",
        country: "Russia",
        city: "Moscow",
        status: "Active",
        photos: ["Side glass photo"],
        reviewNote: "Window film use count updated.",
        pointsAwarded: 100,
      },
      {
        id: "WR-2026-0003",
        warrantyCode: "HH-TPU-2026-0012",
        vin: "JTMRFREV0HJ123456",
        customerName: "Irina Volkova",
        vehicleMake: "Toyota",
        vehicleModel: "RAV4",
        vehicleYear: "2025",
        productType: "TPU_COLOR_PPF",
        productName: "Satin TPU Color PPF",
        installationCategory: "FULL_CAR_PPF",
        installationDate: "2026-07-12",
        warrantyExpiryDate: "",
        dealerCode: "RU-MSK-001",
        dealerName: "Moscow Auto Studio",
        country: "Russia",
        city: "Moscow",
        status: "Pending Review",
        photos: ["Front view", "Rear quarter"],
        reviewNote: "",
        pointsAwarded: 0,
      },
    ],
    pointsLedger: [
      {
        id: "PT-2026-0001",
        dealerCode: "RU-MSK-001",
        dealerName: "Moscow Auto Studio",
        change: 100,
        type: "Warranty Approval",
        reason: "WR-2026-0001 approved",
        operator: "System",
        time: "2026-07-10 10:32",
      },
      {
        id: "PT-2026-0002",
        dealerCode: "RU-MSK-001",
        dealerName: "Moscow Auto Studio",
        change: 100,
        type: "Warranty Approval",
        reason: "WR-2026-0002 approved",
        operator: "System",
        time: "2026-07-10 10:36",
      },
      {
        id: "PT-2026-0003",
        dealerCode: "RU-MSK-001",
        dealerName: "Moscow Auto Studio",
        change: 300,
        type: "Manual Adjustment",
        reason: "Launch training participation",
        operator: "HQ Admin",
        time: "2026-07-11 15:10",
      },
    ],
    rewards: [
      {
        id: "RW-001",
        category: "Workwear",
        name: "H&H Workwear",
        points: 420,
        status: "Available for Redemption",
        stockStatus: "Available for Redemption",
      },
      {
        id: "RW-002",
        category: "Workwear",
        name: "H&H Cap",
        points: 160,
        status: "Available for Redemption",
        stockStatus: "Available for Redemption",
      },
      {
        id: "RW-003",
        category: "Sample Material",
        name: "TPU Color Film Color Card",
        points: 520,
        status: "Available for Redemption",
        stockStatus: "Available for Redemption",
      },
      {
        id: "RW-004",
        category: "Sample Material",
        name: "PPF Sample Book",
        points: 680,
        status: "Out of Stock",
        stockStatus: "Out of Stock",
      },
      {
        id: "RW-005",
        category: "Tools",
        name: "Installation Tool Kit",
        points: 760,
        status: "Available for Redemption",
        stockStatus: "Available for Redemption",
      },
      {
        id: "RW-006",
        category: "Tools",
        name: "Seat Cover",
        points: 120,
        status: "Coming Soon",
        stockStatus: "Coming Soon",
      },
    ],
    redemptions: [
      {
        id: "RD-2026-0001",
        dealerCode: "RU-MSK-001",
        dealerName: "Moscow Auto Studio",
        rewardId: "RW-002",
        rewardName: "H&H Cap",
        points: 160,
        quantity: 2,
        status: "Approved, Waiting for Next Shipment",
        remark: "Ship with next film order.",
        time: "2026-07-12 09:45",
      },
    ],
    importBatches: [
      {
        id: "IMP-2026-0706-A",
        name: "Russia first launch shipment",
        time: "2026-07-06 11:20",
        operator: "HQ Admin",
        totalCodes: 2,
        productTypes: "PPF, WINDOW_FILM",
        dealer: "RU-MSK-001",
        status: "Imported",
        remark: "Dealer code matched automatically.",
      },
    ],
  };

  const app = document.getElementById("app");
  let data = loadData();
  let ui = {
    selectedRecordId: "",
    toast: "",
  };
  let lastRenderedRoute = "";

  function loadData() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && saved.version === VERSION) {
        return saved;
      }
    } catch (error) {
      // Fall back to seed data.
    }
    const cloned = JSON.parse(JSON.stringify(seedData));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloned));
    return cloned;
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function lang() {
    return localStorage.getItem("hhWarrantyLang") || "en";
  }

  function t(key) {
    return (copy[lang()] && copy[lang()][key]) || copy.en[key] || key;
  }

  function isAuthenticated(role) {
    return sessionStorage.getItem(AUTH[role].sessionKey) === "true";
  }

  function authenticate(role, form) {
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const account = AUTH[role];
    if (email !== account.email || password !== account.password) {
      showToast(role === "dealer" ? "Invalid dealer account or password." : "Invalid admin account or password.");
      return;
    }
    sessionStorage.setItem(account.sessionKey, "true");
    setRoute(account.dashboardRoute);
  }

  function signOut(role) {
    const account = AUTH[role];
    sessionStorage.removeItem(account.sessionKey);
    setRoute(account.loginRoute);
  }

  function translateValue(value) {
    const currentLang = lang();
    if (currentLang === "en") return value;
    const exact = exactText[currentLang] || {};
    const phrases = phraseText[currentLang] || {};
    const source = String(value ?? "");
    const trimmed = source.trim();
    if (!trimmed) return source;
    let translated = exact[trimmed] || trimmed;
    if (!exact[trimmed]) {
      Object.entries(phrases)
        .sort((left, right) => right[0].length - left[0].length)
        .forEach(([from, to]) => {
          translated = translated.replaceAll(from, to);
        });
    }
    return translated === trimmed ? source : source.replace(trimmed, translated);
  }

  function localizeRenderedPage() {
    const currentLang = lang();
    document.title = t("heroTitle");
    if (currentLang === "en") return;

    const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    nodes.forEach((node) => {
      node.nodeValue = translateValue(node.nodeValue);
    });

    app.querySelectorAll("[placeholder]").forEach((element) => {
      element.setAttribute("placeholder", translateValue(element.getAttribute("placeholder")));
    });
    app.querySelectorAll("[aria-label]").forEach((element) => {
      element.setAttribute("aria-label", translateValue(element.getAttribute("aria-label")));
    });
  }

  function getRoute() {
    const route = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
    return route || "home";
  }

  function href(route) {
    return route === "home" ? "#/" : `#/${route}`;
  }

  function isRoute(route, target) {
    return route === target || route.startsWith(`${target}/`);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function statusClass(status) {
    const lower = String(status).toLowerCase();
    if (lower.includes("active") || lower.includes("approved") || lower.includes("shipped")) return "status-active";
    if (lower.includes("pending") || lower.includes("waiting")) return "status-pending";
    if (lower.includes("reject") || lower.includes("void") || lower.includes("out")) return "status-rejected";
    return "status-allocated";
  }

  function statusBadge(status) {
    return `<span class="status ${statusClass(status)}">${escapeHtml(translateValue(status))}</span>`;
  }

  function dealerByCode(code) {
    return data.dealers.find((dealer) => dealer.code === code);
  }

  function codeByValue(value) {
    return data.warrantyCodes.find((code) => code.code === value);
  }

  function productLabel(type) {
    const baseMap = {
      PPF: "PPF",
      WINDOW_FILM: "Window Film",
      TPU_COLOR_PPF: "TPU Color PPF",
      MANUAL_PARTIAL: "Manual / Partial",
    };
    const map = Object.fromEntries(
      Object.entries(baseMap).map(([key, value]) => [key, translateValue(value)]),
    );
    return map[type] || type;
  }

  function categoryLabel(value) {
    const baseMap = {
      FULL_CAR_PPF: "Full Car PPF",
      PARTIAL_PPF: "Partial PPF",
      WINDOW_FILM: "Window Film",
      TPU_COLOR_PPF: "TPU Color PPF",
      MANUAL_PARTIAL: "Manual / Partial",
    };
    const map = Object.fromEntries(
      Object.entries(baseMap).map(([key, label]) => [key, translateValue(label)]),
    );
    return map[value] || value;
  }

  function maskVin(vin) {
    if (!vin || vin.length < 8) return vin;
    return `${vin.slice(0, 3)}**********${vin.slice(-4)}`;
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function nowLabel() {
    const date = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function addYears(dateString, years) {
    const date = new Date(`${dateString}T00:00:00`);
    date.setFullYear(date.getFullYear() + Number(years || 0));
    return date.toISOString().slice(0, 10);
  }

  function activeDealer() {
    return data.dealers[0];
  }

  function dealerRecords() {
    const dealer = activeDealer();
    return data.warrantyRecords.filter((record) => record.dealerCode === dealer.code);
  }

  function frozenPointsForDealer(dealerCode) {
    return data.redemptions
      .filter((item) => item.dealerCode === dealerCode && item.status === "Pending Review")
      .reduce((sum, item) => sum + item.points * item.quantity, 0);
  }

  function availableCodesForDealer(dealerCode) {
    return data.warrantyCodes.filter((code) => {
      const remaining = Number(code.usageLimit) - Number(code.usedCount);
      return code.dealerCode === dealerCode && code.status === "Allocated" && remaining > 0;
    });
  }

  function renderHeader(route) {
    const nav = [
      ["verify", t("verify")],
      ["terms", t("terms")],
      [isAuthenticated("dealer") ? AUTH.dealer.dashboardRoute : AUTH.dealer.loginRoute, t("dealer")],
      [isAuthenticated("admin") ? AUTH.admin.dashboardRoute : AUTH.admin.loginRoute, t("admin")],
    ];
    return `
      <header class="portal-header">
        <a class="portal-brand" href="${href("home")}" aria-label="H&H Warranty home">
          <img class="portal-brand-logo" src="../assets/hh-logo.png" alt="H&H Automotive Films" />
          <span class="portal-brand-copy">
            <span>Warranty System</span>
            <strong>H&amp;H</strong>
          </span>
        </a>
        <nav class="portal-nav" aria-label="Warranty navigation">
          ${nav
            .map(([navRoute, label]) => {
              const active =
                navRoute === "verify"
                  ? route === "home" || route === "verify"
                  : isRoute(route, navRoute.split("/")[0]);
              return `<a class="${active ? "is-active" : ""}" href="${href(navRoute)}">${escapeHtml(label)}</a>`;
            })
            .join("")}
        </nav>
        <div class="header-actions">
          ${renderLanguageSelect("language-select")}
          <a class="home-link" href="../index.html">${escapeHtml(t("back"))}</a>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    return `
      <footer class="portal-footer">
        <span>H&amp;H Warranty &amp; Partner Points System V1 Preview</span>
        <span>Future deployment target: warranty.hhppf.com - <a href="../index.html">Main website</a> - <button class="text-button" data-action="reset-demo" type="button">Reset demo data</button></span>
      </footer>
    `;
  }

  function renderPage(content) {
    return `<main class="page"><div class="page-inner">${content}</div></main>`;
  }

  function renderLanguageSelect(id) {
    return `
      <label class="hidden" for="${id}">${t("language")}</label>
      <select class="language-select" id="${id}" data-action="language">
        <option value="en" ${lang() === "en" ? "selected" : ""}>EN</option>
        <option value="zh" ${lang() === "zh" ? "selected" : ""}>中文</option>
        <option value="ru" ${lang() === "ru" ? "selected" : ""}>RU</option>
      </select>
    `;
  }

  function isWorkspaceRoute(route) {
    return (
      (isRoute(route, "dealer") && route !== AUTH.dealer.loginRoute && isAuthenticated("dealer")) ||
      (isRoute(route, "admin") && route !== AUTH.admin.loginRoute && isAuthenticated("admin"))
    );
  }

  function renderWorkspaceShell({ active, content, items, lead, logoutAction, title, kicker }) {
    return `
      <main class="workspace-page">
        <aside class="workspace-sidebar">
          <a class="workspace-brand" href="${href("home")}" aria-label="H&H Warranty home">
            <strong>H&amp;H</strong>
            <span>Warranty OS V1</span>
          </a>
          <nav class="workspace-nav" aria-label="${escapeHtml(kicker)} navigation">
            ${items
              .map(
                ([route, label]) => `
                  <a class="${active === route ? "is-active" : ""}" href="${href(route)}">
                    <span class="workspace-nav-mark" aria-hidden="true"></span>
                    ${label}
                  </a>
                `,
              )
              .join("")}
          </nav>
          <div class="workspace-sidebar-footer">
            <a href="../index.html">${escapeHtml(t("back"))}</a>
            <button data-action="${logoutAction}" type="button">Log out</button>
          </div>
        </aside>
        <section class="workspace-main">
          <header class="workspace-topbar">
            <div>
              <p class="section-kicker">${kicker}</p>
              <h1>${title}</h1>
              <p>${lead}</p>
            </div>
            <div class="workspace-actions">
              ${renderLanguageSelect("workspace-language-select")}
            </div>
          </header>
          <div class="workspace-content">
            ${content}
          </div>
        </section>
      </main>
    `;
  }

  function renderHome() {
    return renderVerify();
  }

  function renderVerify() {
    const query = sessionStorage.getItem("hhVerifyVin") || "";
    const normalized = query.trim().toUpperCase();
    const results = normalized
      ? data.warrantyRecords.filter(
          (record) => record.vin.toUpperCase() === normalized && record.status === "Active",
        )
      : [];
    const selected =
      results.find((record) => record.id === ui.selectedRecordId) || results[0] || null;

    return renderPage(`
      <section>
        <p class="section-kicker">Owner Portal</p>
        <h1>${escapeHtml(t("ownerQuery"))}</h1>
        <p class="lead">Enter a VIN to view active H&amp;H warranty records and certificate details. Web pages mask the VIN; printable certificates show the full VIN.</p>
      </section>

      <section class="panel">
        <form class="form-grid" data-form="verify">
          <label class="full">
            VIN / Vehicle Identification Number
            <input name="vin" value="${escapeHtml(query)}" placeholder="Example: XTA210990R1234567" required />
          </label>
          <div class="form-actions full">
            <button class="button" type="submit">Search Warranty</button>
            <button class="ghost-button" type="button" data-action="sample-vin">Use Sample VIN</button>
          </div>
        </form>
      </section>

      ${normalized ? renderVerifyResults(normalized, results, selected) : ""}
    `);
  }

  function renderVerifyResults(vin, results, selected) {
    if (!results.length) {
      return `
        <section class="result-card">
          <h3>No active H&amp;H warranty record found</h3>
          <p>Please check the VIN or contact the authorized dealer that installed the film.</p>
        </section>
      `;
    }

    return `
      <section class="result-card">
        <h3>${results.length} active record${results.length > 1 ? "s" : ""} found for ${escapeHtml(maskVin(vin))}</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product Type</th>
                <th>Product Name</th>
                <th>Installation</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  (record) => `
                    <tr>
                      <td>${productLabel(record.productType)}</td>
                      <td>${escapeHtml(record.productName)}</td>
                      <td>${categoryLabel(record.installationCategory)}</td>
                      <td>${escapeHtml(record.installationDate)}</td>
                      <td>${statusBadge(record.status)}</td>
                      <td>
                        <div class="inline-actions">
                          <button class="text-button" data-action="select-record" data-id="${record.id}">View</button>
                          <button class="text-button" data-action="print-certificate" data-id="${record.id}">Download PDF</button>
                        </div>
                      </td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        ${selected ? renderCertificate(selected, true) : ""}
      </section>
    `;
  }

  function renderCertificate(record, masked) {
    return `
      <article class="certificate">
        <div class="certificate-header">
          <div>
            <p class="section-kicker">H&amp;H Warranty Certificate</p>
            <h2>Warranty Certificate</h2>
            ${statusBadge(record.status)}
          </div>
          <span class="certificate-logo">
            <img src="../assets/hh-logo.png" alt="H&H Automotive Films" />
          </span>
        </div>
        <div class="certificate-grid">
          ${certificateField("Warranty Code", record.warrantyCode)}
          ${certificateField("Customer Name", record.customerName)}
          ${certificateField("VIN", masked ? maskVin(record.vin) : record.vin)}
          ${certificateField("Vehicle", `${record.vehicleMake} ${record.vehicleModel} ${record.vehicleYear}`)}
          ${certificateField("Product Type", productLabel(record.productType))}
          ${certificateField("Product Name", record.productName)}
          ${certificateField("Installation Category", categoryLabel(record.installationCategory))}
          ${certificateField("Installation Date", record.installationDate)}
          ${certificateField("Warranty Expiry Date", record.warrantyExpiryDate || "Pending approval")}
          ${certificateField("Authorized Dealer", record.dealerName)}
          ${certificateField("Country / City", `${record.country} / ${record.city}`)}
          ${certificateField("Verification Link", "warranty.hhppf.com/verify")}
        </div>
        <p class="notice" style="margin-top: 20px;">For full warranty terms and limitations, please visit the official H&amp;H Warranty Terms page.</p>
        <div class="form-actions no-print" style="margin-top: 18px;">
          <button class="button" data-action="print-certificate" data-id="${record.id}">Print / Save PDF</button>
          <a class="ghost-button" href="${href("terms")}">View Warranty Terms</a>
        </div>
      </article>
    `;
  }

  function certificateField(label, value) {
    return `<div class="field"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function renderTerms() {
    const terms = warrantyTermsByLang();
    return renderPage(`
      <section class="terms-hero">
        <p class="section-kicker">${escapeHtml(terms.kicker)}</p>
        <h1>${escapeHtml(terms.title)}</h1>
        <p class="lead">${escapeHtml(terms.lead)}</p>
        <div class="terms-meta">
          ${terms.meta.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>
      <section class="terms-document">
        ${terms.sections
          .map(
            (section) => `
              <article class="terms-block">
                <h2>${escapeHtml(section.title)}</h2>
                ${section.body ? `<p>${escapeHtml(section.body)}</p>` : ""}
                ${
                  section.items
                    ? `<ul class="terms-list">${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
                    : ""
                }
              </article>
            `,
          )
          .join("")}
        <aside class="terms-note">
          <strong>${escapeHtml(terms.noteTitle)}</strong>
          <p>${escapeHtml(terms.note)}</p>
        </aside>
      </section>
    `);
  }

  function warrantyTermsByLang() {
    const zhTerms = {
      kicker: "质保条款",
      title: "H&H 汽车膜有限质保条款",
      lead:
        "本条款适用于由 H&H 授权经销商完成施工，并已在 H&H 电子质保系统中激活的正品汽车膜产品。具体质保项目、产品名称、安装日期和质保到期日，以车主电子质保证书记录为准。",
      meta: ["适用于车主查询与售后沟通", "凭 VIN、质保码和电子证书核验", "质保自安装日期起计算"],
      sections: [
        {
          title: "1. 适用范围",
          body:
            "本有限质保仅适用于 H&H 正品漆面保护膜、汽车窗膜、TPU 改色膜及经 H&H 确认适用的相关汽车膜产品。产品必须由 H&H 授权经销商按标准流程施工，并完成电子质保登记及总部审核。",
        },
        {
          title: "2. 质保期限",
          items: [
            "质保期限以电子质保证书显示的安装日期和到期日期为准。",
            "不同产品系列、施工部位和使用场景可能对应不同质保期限。",
            "若纸质、口头或其他渠道信息与电子质保证书不一致，以 H&H 电子质保系统记录为准。",
          ],
        },
        {
          title: "3. 质保覆盖内容",
          body:
            "在正常车辆使用和合理养护条件下，若产品出现经 H&H 或授权经销商确认的材料或施工相关质量问题，可按本条款申请质保服务。",
          items: [
            "漆面保护膜：异常黄变、开裂、起泡、脱胶、分层或非人为造成的明显材料失效。",
            "汽车窗膜：非人为造成的起泡、脱胶、分层、明显褪色或影响正常使用的材料缺陷。",
            "TPU 改色膜：非人为造成的异常开裂、脱胶、分层、明显褪色或材料稳定性问题。",
          ],
        },
        {
          title: "4. 不属于质保范围",
          items: [
            "事故、碰撞、刮擦、石击、外力撕扯、火烧、水淹或不可抗力导致的损坏。",
            "使用强腐蚀性清洁剂、研磨剂、高压水枪近距离冲边、抛光机不当操作或其他不当养护造成的问题。",
            "未经授权的施工、拆除、补膜、改装或由非授权门店处理后产生的问题。",
            "车辆原厂漆面、后喷漆、钣喷质量、锈蚀、清漆层脱落或车身基材缺陷导致的膜面异常。",
            "正常使用磨损、轻微划痕、污渍、水渍、边缘积尘，以及不影响产品功能的外观差异。",
          ],
        },
        {
          title: "5. 质保申请流程",
          items: [
            "车主应保留电子质保证书，并向原施工经销商或 H&H 指定服务渠道提交 VIN、质保码、问题照片和车辆信息。",
            "授权经销商将对车辆和膜面状态进行初步检查，必要时提交 H&H 复核。",
            "经确认属于质保范围的，H&H 或授权经销商将提供维修、局部更换或等效处理方案。",
          ],
        },
        {
          title: "6. 车主维护义务",
          items: [
            "施工后应按经销商交付建议完成固化期养护，避免过早洗车、冲边或清洁剂接触边缘。",
            "日常清洁应使用中性清洁用品和柔软工具，避免使用强溶剂、研磨剂和硬质刮擦工具。",
            "发现边缘翘起、起泡或异常情况时，应尽快联系授权经销商处理，避免继续扩大损伤。",
          ],
        },
        {
          title: "7. 服务方式与责任限制",
          body:
            "质保服务通常以问题部位的检测、维修或更换为主要补救方式。除当地法律另有强制规定外，本质保不涵盖车辆停用损失、交通费用、保险费用、间接损失、附带损失或惩罚性赔偿。",
        },
        {
          title: "8. 证书与数据说明",
          body:
            "电子质保证书是车主查询和售后沟通的重要凭证。网页端可能会对 VIN 等敏感信息进行脱敏展示；用于售后、保险或打印存档的 PDF 证书可显示完整信息。",
        },
        {
          title: "9. 地区适用",
          body:
            "不同国家或地区的消费者保护规定可能存在差异。如本条款与当地强制性法律规定不一致，以当地强制性法律规定为准；其余部分继续有效。",
        },
      ],
      noteTitle: "重要提示",
      note:
        "本条款用于说明 H&H 产品有限质保的基本规则。具体质保结论需结合产品型号、施工记录、车辆状态和现场检测结果确认。",
    };
    const enTerms = {
      kicker: "Warranty Terms",
      title: "H&H Automotive Film Limited Warranty",
      lead:
        "These terms apply to genuine H&H automotive film products installed by an authorized H&H dealer and activated in the H&H electronic warranty system. Product name, installation date, coverage and expiry date follow the electronic warranty certificate.",
      meta: ["For owner verification and service", "Verified by VIN, warranty code and certificate", "Coverage starts from the installation date"],
      sections: [
        {
          title: "1. Scope",
          body:
            "This limited warranty covers eligible H&H paint protection film, automotive window film, TPU color film and related automotive film products confirmed by H&H, when installed by an authorized dealer and approved in the H&H warranty system.",
        },
        {
          title: "2. Warranty Period",
          items: [
            "The warranty period follows the installation date and expiry date shown on the electronic warranty certificate.",
            "Different product series, installation areas and usage conditions may have different warranty periods.",
            "If other records conflict with the electronic certificate, the H&H warranty system record prevails.",
          ],
        },
        {
          title: "3. Covered Issues",
          items: [
            "PPF: abnormal yellowing, cracking, bubbling, adhesive failure, delamination or confirmed material failure.",
            "Window film: bubbling, adhesive failure, delamination, significant fading or confirmed material defect under normal use.",
            "TPU color film: abnormal cracking, adhesive failure, delamination, significant fading or confirmed stability issue.",
          ],
        },
        {
          title: "4. Exclusions",
          items: [
            "Damage caused by accident, impact, scratching, stone chips, fire, flood, misuse or force majeure.",
            "Damage caused by corrosive chemicals, abrasive cleaning, improper pressure washing or improper maintenance.",
            "Issues caused by unauthorized installation, removal, repair, modification or third-party handling.",
            "Paint defects, repainting defects, corrosion, clear-coat failure or vehicle substrate defects.",
            "Normal wear, minor scratches, stains, water marks, edge dust or cosmetic differences that do not affect function.",
          ],
        },
        {
          title: "5. Claim Process",
          items: [
            "The owner should provide the electronic certificate, VIN, warranty code, photos and vehicle information to the installing dealer or H&H service channel.",
            "The authorized dealer will inspect the vehicle and submit the case to H&H when required.",
            "Approved claims may be handled by repair, partial replacement or another equivalent service solution.",
          ],
        },
        {
          title: "6. Owner Care",
          items: [
            "Follow the dealer's curing and maintenance instructions after installation.",
            "Use neutral cleaners and soft tools; avoid solvents, abrasives and hard scraping tools.",
            "Contact an authorized dealer promptly if lifting, bubbling or other abnormal conditions appear.",
          ],
        },
        {
          title: "7. Remedy and Liability",
          body:
            "Warranty service is generally limited to inspection, repair or replacement of the affected area. Unless required by local law, it does not cover loss of use, transportation cost, insurance cost, indirect loss or consequential damages.",
        },
        {
          title: "8. Certificate and Data",
          body:
            "The electronic warranty certificate is the key reference for owner verification and service communication. Public pages may mask sensitive VIN information; printable PDF certificates may include complete details for service or insurance use.",
        },
        {
          title: "9. Local Law",
          body:
            "Where mandatory local consumer protection laws differ from these terms, mandatory local law applies and the remaining terms continue to be effective.",
        },
      ],
      noteTitle: "Important Notice",
      note:
        "Final service decisions depend on product model, installation record, vehicle condition and inspection results.",
    };
    const ruTerms = {
      kicker: "Условия гарантии",
      title: "Ограниченная гарантия H&H на автомобильные пленки",
      lead:
        "Настоящие условия применяются к оригинальным автомобильным пленкам H&H, установленным авторизованным дилером H&H и активированным в электронной системе гарантии H&H. Название продукта, дата установки, срок и окончание гарантии определяются электронным гарантийным сертификатом.",
      meta: ["Для проверки владельцем и сервисного обращения", "Проверка по VIN, гарантийному коду и сертификату", "Срок гарантии считается с даты установки"],
      sections: [
        {
          title: "1. Область действия",
          body:
            "Ограниченная гарантия распространяется на соответствующие пленки H&H для защиты кузова, автомобильные оконные пленки, TPU цветные пленки и связанные автомобильные пленочные продукты, если они установлены авторизованным дилером и одобрены в системе гарантии H&H.",
        },
        {
          title: "2. Срок гарантии",
          items: [
            "Срок гарантии определяется датой установки и датой окончания, указанными в электронном гарантийном сертификате.",
            "Для разных серий продуктов, зон установки и условий эксплуатации могут применяться разные сроки гарантии.",
            "При расхождении с другими источниками преимущество имеет запись в электронной системе гарантии H&H.",
          ],
        },
        {
          title: "3. Гарантийные случаи",
          items: [
            "PPF: аномальное пожелтение, растрескивание, пузыри, отслоение клея, расслоение или подтвержденный дефект материала.",
            "Оконная пленка: пузыри, отслоение клея, расслоение, значительное выцветание или подтвержденный дефект материала при нормальной эксплуатации.",
            "TPU цветная пленка: аномальное растрескивание, отслоение клея, расслоение, значительное выцветание или подтвержденная проблема стабильности материала.",
          ],
        },
        {
          title: "4. Исключения",
          items: [
            "Повреждения вследствие ДТП, удара, царапин, сколов, пожара, затопления, неправильного использования или форс-мажора.",
            "Повреждения от агрессивной химии, абразивной чистки, неправильной мойки высоким давлением или ненадлежащего ухода.",
            "Проблемы после неавторизованной установки, снятия, ремонта, модификации или вмешательства третьих лиц.",
            "Дефекты лакокрасочного покрытия, повторной окраски, коррозия, отслоение лака или дефекты основания автомобиля.",
            "Нормальный износ, мелкие царапины, пятна, водные следы, пыль по краям или внешние отличия, не влияющие на функцию продукта.",
          ],
        },
        {
          title: "5. Порядок обращения",
          items: [
            "Владелец предоставляет электронный сертификат, VIN, гарантийный код, фотографии и данные автомобиля дилеру установки или сервисному каналу H&H.",
            "Авторизованный дилер осматривает автомобиль и при необходимости передает случай на проверку H&H.",
            "Подтвержденные случаи могут быть урегулированы ремонтом, частичной заменой или эквивалентным сервисным решением.",
          ],
        },
        {
          title: "6. Обязанности владельца",
          items: [
            "После установки соблюдать рекомендации дилера по периоду фиксации и уходу.",
            "Использовать нейтральные чистящие средства и мягкие инструменты; избегать растворителей, абразивов и жестких скребков.",
            "При появлении поднятия краев, пузырей или иных аномалий своевременно обратиться к авторизованному дилеру.",
          ],
        },
        {
          title: "7. Способ обслуживания и ограничение ответственности",
          body:
            "Гарантийное обслуживание обычно ограничивается осмотром, ремонтом или заменой затронутой зоны. Если иное не требуется местным законом, гарантия не покрывает простой автомобиля, транспортные расходы, страховые расходы, косвенные или последующие убытки.",
        },
        {
          title: "8. Сертификат и данные",
          body:
            "Электронный гарантийный сертификат является ключевым документом для проверки и сервисного обращения. Публичные страницы могут скрывать часть VIN; печатный PDF-сертификат может содержать полные данные для сервиса или страхования.",
        },
        {
          title: "9. Местное законодательство",
          body:
            "Если обязательные нормы местного законодательства о защите потребителей отличаются от этих условий, применяются такие обязательные нормы, а остальные положения сохраняют силу.",
        },
      ],
      noteTitle: "Важное примечание",
      note:
        "Окончательное сервисное решение зависит от модели продукта, записи установки, состояния автомобиля и результатов осмотра.",
    };
    if (lang() === "zh") return zhTerms;
    if (lang() === "ru") return ruTerms;
    return enTerms;
  }

  function renderDealerLogin() {
    return renderPage(`
      <section class="login-wrap">
        <div>
          <p class="section-kicker">Dealer Portal</p>
          <h1>Dealer Login</h1>
          <p class="lead">Authorized dealers register warranties, upload installation photos, track review status, and redeem partner points.</p>
          <div class="code-pill-list">
            <span>Register Warranty</span>
            <span>Warranty Records</span>
            <span>Partner Points</span>
            <span>Rewards Center</span>
          </div>
        </div>
        <form class="login-panel" data-form="dealer-login">
          <h3>Demo account</h3>
          <p class="demo-account">Email: dealer@hhppf.com<br>Password: dealer123</p>
          <label>Email or account name<input name="email" value="dealer@hhppf.com" required /></label>
          <label>Password<input name="password" type="password" value="dealer123" required /></label>
          <button class="button" type="submit">Enter Dealer Portal</button>
        </form>
      </section>
    `);
  }

  function dealerShell(active, content) {
    const items = [
      ["dealer/dashboard", "Dashboard"],
      ["dealer/register-warranty", "Register Warranty"],
      ["dealer/warranty-records", "Warranty Records"],
      ["dealer/points", "My Points"],
      ["dealer/rewards", "Rewards Center"],
    ];
    return renderWorkspaceShell({
      active,
      content,
      items,
      kicker: "Dealer Portal",
      title: "Moscow Auto Studio",
      lead: "Demo dealer workspace for warranty registration, record tracking, points, and material redemption.",
      logoutAction: "dealer-logout",
    });
  }

  function renderDealerDashboard() {
    const dealer = activeDealer();
    const records = dealerRecords();
    const activeCount = records.filter((record) => record.status === "Active").length;
    const pendingCount = records.filter((record) => record.status === "Pending Review").length;
    const availableCodes = availableCodesForDealer(dealer.code);
    const frozen = frozenPointsForDealer(dealer.code);
    return dealerShell(
      "dealer/dashboard",
      `
        <section class="metric-grid">
          <article class="metric-card"><strong>${dealer.points - frozen}</strong><span>Available points</span></article>
          <article class="metric-card"><strong>${pendingCount}</strong><span>Pending review</span></article>
          <article class="metric-card"><strong>${activeCount}</strong><span>Active warranties</span></article>
          <article class="metric-card"><strong>${availableCodes.length}</strong><span>Usable warranty codes</span></article>
        </section>
        <section class="home-grid" style="margin-top: 18px;">
          <article class="panel"><h3>Register Warranty</h3><p>Select an allocated warranty code, fill vehicle information, and submit photos for HQ review.</p><a class="text-button" href="${href("dealer/register-warranty")}">Start registration</a></article>
          <article class="panel"><h3>Warranty Records</h3><p>Review pending, active, and rejected records submitted by this dealer account.</p><a class="text-button" href="${href("dealer/warranty-records")}">View records</a></article>
          <article class="panel"><h3>Rewards Center</h3><p>Use partner points for workwear, caps, color cards, sample books, and tools.</p><a class="text-button" href="${href("dealer/rewards")}">Redeem materials</a></article>
        </section>
      `,
    );
  }

  function renderDealerRegister() {
    const dealer = activeDealer();
    const codes = availableCodesForDealer(dealer.code);
    const firstCode = codes[0] || null;
    return dealerShell(
      "dealer/register-warranty",
      `
        <section class="panel">
          <h2>Register Warranty</h2>
          <p>Product type, product name, warranty years, and usage rules are filled from the selected factory warranty code.</p>
          <form class="form-grid" data-form="register-warranty">
            <label>
              Warranty Code
              <select name="warrantyCode" id="dealer-code-select" required>
                ${codes.map((code) => `<option value="${code.code}">${code.code} - ${productLabel(code.productType)}</option>`).join("")}
              </select>
            </label>
            <label>
              Installation Category
              <select name="installationCategory" required>
                <option value="FULL_CAR_PPF">Full Car PPF</option>
                <option value="PARTIAL_PPF">Partial PPF</option>
                <option value="WINDOW_FILM">Window Film</option>
                <option value="TPU_COLOR_PPF">TPU Color PPF</option>
                <option value="MANUAL_PARTIAL">Manual / Partial</option>
              </select>
            </label>
            <div class="full notice" id="dealer-code-summary">
              ${firstCode ? renderCodeSummary(firstCode) : "No available warranty codes. Please ask HQ to allocate codes."}
            </div>
            <label>
              VIN
              <input name="vin" placeholder="17-character VIN" required />
            </label>
            <label>
              Customer Name
              <input name="customerName" placeholder="Owner name" />
            </label>
            <label>
              Vehicle Make
              <input name="vehicleMake" placeholder="BMW" />
            </label>
            <label>
              Vehicle Model
              <input name="vehicleModel" placeholder="X5" />
            </label>
            <label>
              Vehicle Year
              <input name="vehicleYear" placeholder="2026" />
            </label>
            <label>
              Installation Date
              <input name="installationDate" type="date" value="${today()}" required />
            </label>
            <label class="full upload-box">
              Installation Photo - 1 to 3 photos
              <input name="photos" type="file" accept="image/*" multiple />
              <span class="small">Production upload should compress images to 500KB-1MB, max 1600px longest edge, then store files in Cloudflare R2.</span>
            </label>
            <label class="full">
              Remark
              <textarea name="remark" placeholder="Any special note for HQ review"></textarea>
            </label>
            <div class="form-actions full">
              <button class="button" type="submit" ${codes.length ? "" : "disabled"}>Submit for Review</button>
            </div>
          </form>
        </section>
      `,
    );
  }

  function renderCodeSummary(code) {
    const remaining = Number(code.usageLimit) - Number(code.usedCount);
    return `
      Product: ${productLabel(code.productType)} / ${escapeHtml(code.productName)}.
      Warranty Years: ${escapeHtml(code.warrantyYears)}.
      Usage: ${escapeHtml(code.usageType)} (${remaining} remaining).
    `;
  }

  function renderDealerRecords() {
    return dealerShell(
      "dealer/warranty-records",
      `
        <section class="panel">
          <h2>Warranty Records</h2>
          ${warrantyRecordTable(dealerRecords(), "dealer")}
        </section>
      `,
    );
  }

  function renderDealerPoints() {
    const dealer = activeDealer();
    const frozen = frozenPointsForDealer(dealer.code);
    const ledger = data.pointsLedger.filter((entry) => entry.dealerCode === dealer.code);
    return dealerShell(
      "dealer/points",
      `
        <section class="metric-grid">
          <article class="metric-card"><strong>${dealer.points}</strong><span>Total points</span></article>
          <article class="metric-card"><strong>${frozen}</strong><span>Frozen in review</span></article>
          <article class="metric-card"><strong>${dealer.points - frozen}</strong><span>Available balance</span></article>
          <article class="metric-card"><strong>${data.settings.pointsValidityMonths}</strong><span>Validity months reserved</span></article>
        </section>
        <section class="panel" style="margin-top: 18px;">
          <h2>Points Ledger</h2>
          ${pointsTable(ledger)}
        </section>
      `,
    );
  }

  function renderDealerRewards() {
    const dealer = activeDealer();
    const frozen = frozenPointsForDealer(dealer.code);
    const available = dealer.points - frozen;
    return dealerShell(
      "dealer/rewards",
      `
        <section class="panel">
          <h2>Rewards Center</h2>
          <p>Available points: <strong>${available}</strong>. Inventory quantity is managed by HQ but not shown to dealers.</p>
          <div class="reward-grid">
            ${data.rewards
              .map((reward) => {
                const canRedeem = reward.status === "Available for Redemption" && available >= reward.points;
                return `
                  <article class="data-card">
                    <span class="badge">${escapeHtml(reward.category)}</span>
                    <h3>${escapeHtml(reward.name)}</h3>
                    <p>${reward.points} points per item</p>
                    ${statusBadge(reward.status)}
                    <div class="form-actions" style="margin-top: 14px;">
                      <button class="button" data-action="redeem" data-id="${reward.id}" ${canRedeem ? "" : "disabled"}>Request Redemption</button>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </section>
      `,
    );
  }

  function renderAdminLogin() {
    return renderPage(`
      <section class="login-wrap">
        <div>
          <p class="section-kicker">HQ Admin</p>
          <h1>Admin Login</h1>
          <p class="lead">HQ administrators manage products, dealers, factory warranty codes, reviews, points, rewards, and export workflows.</p>
        </div>
        <form class="login-panel" data-form="admin-login">
          <h3>Demo account</h3>
          <p class="demo-account">Email: admin@hhppf.com<br>Password: admin123</p>
          <label>Email or account name<input name="email" value="admin@hhppf.com" required /></label>
          <label>Password<input name="password" type="password" value="admin123" required /></label>
          <button class="button" type="submit">Enter Admin Console</button>
        </form>
      </section>
    `);
  }

  function adminShell(active, content) {
    const items = [
      ["admin/dashboard", "Dashboard"],
      ["admin/products", "Products"],
      ["admin/dealers", "Dealers"],
      ["admin/warranty-codes", "Warranty Codes"],
      ["admin/import", "Import"],
      ["admin/allocation", "Allocation"],
      ["admin/reviews", "Reviews"],
      ["admin/points", "Points"],
      ["admin/rewards", "Rewards"],
      ["admin/redemptions", "Redemptions"],
      ["admin/export", "Export"],
    ];
    return renderWorkspaceShell({
      active,
      content,
      items,
      kicker: "HQ Admin Console",
      title: "Warranty Operations",
      lead: "Central control for product setup, dealer setup, code import, allocation, review, points, reward inventory, and exports.",
      logoutAction: "admin-logout",
    });
  }

  function renderAdminDashboard() {
    const pending = data.warrantyRecords.filter((record) => record.status === "Pending Review").length;
    const issuedPoints = data.pointsLedger.reduce((sum, entry) => sum + Number(entry.change), 0);
    return adminShell(
      "admin/dashboard",
      `
        <section class="metric-grid">
          <article class="metric-card"><strong>${data.warrantyRecords.length}</strong><span>Total warranty records</span></article>
          <article class="metric-card"><strong>${pending}</strong><span>Pending reviews</span></article>
          <article class="metric-card"><strong>${issuedPoints}</strong><span>Points issued</span></article>
          <article class="metric-card"><strong>${data.redemptions.length}</strong><span>Redemption requests</span></article>
        </section>
        <section class="panel"><h3>Dealer Ranking</h3>${dealerRankingTable()}</section>
        <section class="panel"><h3>Product Type Split</h3>${productSplitTable()}</section>
      `,
    );
  }

  function renderAdminProducts() {
    return adminShell(
      "admin/products",
      `
        <section class="panel">
          <h2>Product Management</h2>
          <p>Products define default warranty years, usage type, and usage limit. Dealers cannot edit product information during warranty registration.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Type</th><th>Name</th><th>Years</th><th>Usage</th><th>Limit</th><th>Status</th><th>Remark</th></tr></thead>
              <tbody>
                ${data.products
                  .map(
                    (product) => `
                      <tr>
                        <td>${escapeHtml(product.type)}</td>
                        <td>${escapeHtml(product.name)}</td>
                        <td>${escapeHtml(product.warrantyYears)}</td>
                        <td>${escapeHtml(product.usageType)}</td>
                        <td>${escapeHtml(product.defaultUsageLimit)}</td>
                        <td>${statusBadge(product.status)}</td>
                        <td>${escapeHtml(product.remark)}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </section>
      `,
    );
  }

  function renderAdminDealers() {
    return adminShell(
      "admin/dealers",
      `
        <section class="panel">
          <h2>Dealer Management</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Dealer Code</th><th>Name</th><th>Country</th><th>City</th><th>Level</th><th>Parent</th><th>Points</th><th>Status</th></tr></thead>
              <tbody>
                ${data.dealers
                  .map(
                    (dealer) => `
                      <tr>
                        <td>${escapeHtml(dealer.code)}</td>
                        <td>${escapeHtml(dealer.name)}</td>
                        <td>${escapeHtml(dealer.country)}</td>
                        <td>${escapeHtml(dealer.city)}</td>
                        <td>${escapeHtml(dealer.level)}</td>
                        <td>${escapeHtml(dealer.parentCode)}</td>
                        <td>${escapeHtml(dealer.points)}</td>
                        <td>${statusBadge(dealer.status)}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </section>
      `,
    );
  }

  function renderAdminWarrantyCodes() {
    return adminShell(
      "admin/warranty-codes",
      `
        <section class="panel">
          <h2>Warranty Code Management</h2>
          <p>Factory warranty code is the system warranty code and certificate number.</p>
          ${warrantyCodesTable(data.warrantyCodes)}
        </section>
      `,
    );
  }

  function renderAdminImport() {
    return adminShell(
      "admin/import",
      `
        <section class="two-column">
          <article class="panel">
            <h2>Excel Import</h2>
            <p>V1 production should reject the whole file when any row has a duplicate code, missing required field, invalid product, invalid dealer code, or invalid usage setting.</p>
            <div class="form-actions">
              <button class="button" data-action="download-template">Download CSV Template</button>
              <button class="ghost-button" data-action="run-import-demo">Run Validation Demo</button>
            </div>
            <div class="divider"></div>
            <div class="tag-list">
              <span>Warranty Code</span><span>Factory Roll No.</span><span>Batch No.</span><span>Product Type</span><span>Product Name</span><span>Warranty Years</span><span>Usage Type</span><span>Usage Limit</span><span>Dealer Code</span><span>Shipment No.</span>
            </div>
          </article>
          <article class="panel">
            <h2>Import Batches</h2>
            ${importBatchTable()}
          </article>
        </section>
      `,
    );
  }

  function renderAdminAllocation() {
    const unallocated = data.warrantyCodes.filter((code) => code.status === "Unallocated");
    return adminShell(
      "admin/allocation",
      `
        <section class="panel">
          <h2>Warranty Code Allocation</h2>
          <p>Allocate by import batch, shipment batch, product type, code range, or selected warranty codes. This preview supports selected unallocated codes.</p>
          <form class="form-grid" data-form="allocate-code">
            <label>
              Warranty Code
              <select name="warrantyCode" required>
                ${unallocated.map((code) => `<option value="${code.code}">${code.code} - ${productLabel(code.productType)}</option>`).join("")}
              </select>
            </label>
            <label>
              Dealer
              <select name="dealerCode" required>
                ${data.dealers.map((dealer) => `<option value="${dealer.code}">${dealer.code} - ${dealer.name}</option>`).join("")}
              </select>
            </label>
            <div class="form-actions full">
              <button class="button" type="submit" ${unallocated.length ? "" : "disabled"}>Allocate Selected Code</button>
            </div>
          </form>
          <div class="divider"></div>
          ${warrantyCodesTable(unallocated)}
        </section>
      `,
    );
  }

  function renderAdminReviews() {
    const pending = data.warrantyRecords.filter((record) => record.status === "Pending Review");
    return adminShell(
      "admin/reviews",
      `
        <section class="panel">
          <h2>Warranty Review</h2>
          <p>Approval activates the warranty, calculates expiry date, generates the certificate, awards dealer points, and updates window-film usage count.</p>
          ${pending.length ? pending.map(renderReviewCard).join("") : `<p class="notice">No pending reviews right now.</p>`}
        </section>
      `,
    );
  }

  function renderReviewCard(record) {
    const code = codeByValue(record.warrantyCode);
    const remaining = code ? Number(code.usageLimit) - Number(code.usedCount) : 0;
    return `
      <article class="data-card" style="margin-top: 14px;">
        <div class="two-column">
          <div>
            <span class="badge">${record.id}</span>
            <h3>${escapeHtml(record.warrantyCode)} - ${productLabel(record.productType)}</h3>
            <p>${escapeHtml(record.vehicleMake)} ${escapeHtml(record.vehicleModel)} / VIN ${escapeHtml(maskVin(record.vin))}</p>
            <p>Dealer: ${escapeHtml(record.dealerName)}. Photos: ${record.photos.map(escapeHtml).join(", ")}.</p>
          </div>
          <div class="notice">
            Checklist: valid code, allocated dealer, VIN filled, product match, photo uploaded, remaining uses ${remaining}, notes reviewed.
          </div>
        </div>
        <div class="form-actions" style="margin-top: 14px;">
          <button class="button" data-action="approve-review" data-id="${record.id}">Approve</button>
          <button class="danger-button" data-action="reject-review" data-id="${record.id}">Reject</button>
        </div>
      </article>
    `;
  }

  function renderAdminPoints() {
    return adminShell(
      "admin/points",
      `
        <section class="two-column">
          <article class="panel">
            <h2>Points Settings</h2>
            <form class="form-grid" data-form="points-settings">
              <label>
                Default Warranty Approval Points
                <input name="defaultWarrantyPoints" type="number" min="0" value="${data.settings.defaultWarrantyPoints}" />
              </label>
              <label>
                Reserved Validity Months
                <input name="pointsValidityMonths" type="number" min="0" value="${data.settings.pointsValidityMonths}" />
              </label>
              <div class="form-actions full"><button class="button" type="submit">Save Settings</button></div>
            </form>
          </article>
          <article class="panel">
            <h2>Manual Points Adjustment</h2>
            <form class="form-grid" data-form="manual-points">
              <label>
                Dealer
                <select name="dealerCode">${data.dealers.map((dealer) => `<option value="${dealer.code}">${dealer.name}</option>`).join("")}</select>
              </label>
              <label>
                Points Change
                <input name="pointsChange" type="number" value="50" />
              </label>
              <label class="full">
                Reason
                <input name="reason" value="Campaign activity reward" />
              </label>
              <div class="form-actions full"><button class="button" type="submit">Apply Adjustment</button></div>
            </form>
          </article>
        </section>
        <section class="panel" style="margin-top: 18px;">
          <h2>Points Ledger</h2>
          ${pointsTable(data.pointsLedger)}
        </section>
      `,
    );
  }

  function renderAdminRewards() {
    return adminShell(
      "admin/rewards",
      `
        <section class="panel">
          <h2>Rewards Management</h2>
          <p>HQ controls points cost and internal inventory. Dealer-facing portal only shows Available, Out of Stock, or Coming Soon.</p>
          <div class="reward-grid">
            ${data.rewards
              .map(
                (reward) => `
                  <article class="data-card">
                    <span class="badge">${escapeHtml(reward.category)}</span>
                    <h3>${escapeHtml(reward.name)}</h3>
                    <p>${reward.points} points</p>
                    ${statusBadge(reward.status)}
                    <div class="form-actions" style="margin-top: 14px;">
                      <button class="ghost-button" data-action="cycle-reward-status" data-id="${reward.id}">Change Status</button>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    );
  }

  function renderAdminRedemptions() {
    return adminShell(
      "admin/redemptions",
      `
        <section class="panel">
          <h2>Redemption Requests</h2>
          ${redemptionsTable(true)}
        </section>
      `,
    );
  }

  function renderAdminExport() {
    return adminShell(
      "admin/export",
      `
        <section class="panel">
          <h2>Data Export</h2>
          <p>Production export should generate Excel files. This static preview downloads CSV files with the same field groups.</p>
          <div class="form-actions">
            <button class="button" data-action="export-warranties">Export Warranty Records</button>
            <button class="ghost-button" data-action="export-points">Export Points Ledger</button>
            <button class="ghost-button" data-action="export-redemptions">Export Redemption Requests</button>
          </div>
        </section>
      `,
    );
  }

  function warrantyRecordTable(records, context) {
    if (!records.length) return `<p class="notice">No warranty records yet.</p>`;
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Code</th><th>VIN</th><th>Vehicle</th><th>Product</th><th>Install Date</th><th>Expiry</th><th>Status</th>${context === "dealer" ? "<th>Action</th>" : ""}</tr></thead>
          <tbody>
            ${records
              .map(
                (record) => `
                  <tr>
                    <td>${escapeHtml(record.id)}</td>
                    <td>${escapeHtml(record.warrantyCode)}</td>
                    <td>${escapeHtml(maskVin(record.vin))}</td>
                    <td>${escapeHtml(`${record.vehicleMake} ${record.vehicleModel} ${record.vehicleYear}`)}</td>
                    <td>${productLabel(record.productType)}<br><span class="small">${escapeHtml(record.productName)}</span></td>
                    <td>${escapeHtml(record.installationDate)}</td>
                    <td>${escapeHtml(record.warrantyExpiryDate || "Pending")}</td>
                    <td>${statusBadge(record.status)}</td>
                    ${context === "dealer" ? `<td><button class="text-button" data-action="print-certificate" data-id="${record.id}" ${record.status === "Active" ? "" : "disabled"}>Certificate</button></td>` : ""}
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function warrantyCodesTable(codes) {
    if (!codes.length) return `<p class="notice">No matching warranty codes.</p>`;
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Warranty Code</th><th>Product</th><th>Dealer</th><th>Usage</th><th>Remaining</th><th>Batch</th><th>Status</th></tr></thead>
          <tbody>
            ${codes
              .map((code) => {
                const remaining = Number(code.usageLimit) - Number(code.usedCount);
                return `
                  <tr>
                    <td>${escapeHtml(code.code)}</td>
                    <td>${productLabel(code.productType)}<br><span class="small">${escapeHtml(code.productName)}</span></td>
                    <td>${escapeHtml(code.dealerCode || "Unallocated")}</td>
                    <td>${escapeHtml(code.usageType)} / ${escapeHtml(code.usageLimit)}</td>
                    <td>${remaining}</td>
                    <td>${escapeHtml(code.importBatch)}</td>
                    <td>${statusBadge(code.status)}</td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function pointsTable(entries) {
    if (!entries.length) return `<p class="notice">No points history yet.</p>`;
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Dealer</th><th>Change</th><th>Type</th><th>Reason</th><th>Operator</th><th>Time</th></tr></thead>
          <tbody>
            ${entries
              .map(
                (entry) => `
                  <tr>
                    <td>${escapeHtml(entry.id)}</td>
                    <td>${escapeHtml(entry.dealerName)}</td>
                    <td>${entry.change > 0 ? "+" : ""}${escapeHtml(entry.change)}</td>
                    <td>${escapeHtml(entry.type)}</td>
                    <td>${escapeHtml(entry.reason)}</td>
                    <td>${escapeHtml(entry.operator)}</td>
                    <td>${escapeHtml(entry.time)}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function redemptionsTable(withActions) {
    if (!data.redemptions.length) return `<p class="notice">No redemption requests yet.</p>`;
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Dealer</th><th>Reward</th><th>Qty</th><th>Points</th><th>Status</th><th>Remark</th>${withActions ? "<th>Action</th>" : ""}</tr></thead>
          <tbody>
            ${data.redemptions
              .map(
                (item) => `
                  <tr>
                    <td>${escapeHtml(item.id)}</td>
                    <td>${escapeHtml(item.dealerName)}</td>
                    <td>${escapeHtml(item.rewardName)}</td>
                    <td>${escapeHtml(item.quantity)}</td>
                    <td>${escapeHtml(item.points * item.quantity)}</td>
                    <td>${statusBadge(item.status)}</td>
                    <td>${escapeHtml(item.remark)}</td>
                    ${
                      withActions
                        ? `<td><div class="inline-actions">
                            <button class="text-button" data-action="approve-redemption" data-id="${item.id}">Approve</button>
                            <button class="text-button" data-action="reject-redemption" data-id="${item.id}">Reject</button>
                            <button class="text-button" data-action="ship-redemption" data-id="${item.id}">Ship</button>
                          </div></td>`
                        : ""
                    }
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function importBatchTable() {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Batch</th><th>Time</th><th>Operator</th><th>Total</th><th>Products</th><th>Dealer</th><th>Status</th></tr></thead>
          <tbody>
            ${data.importBatches
              .map(
                (batch) => `
                  <tr>
                    <td>${escapeHtml(batch.id)}</td>
                    <td>${escapeHtml(batch.time)}</td>
                    <td>${escapeHtml(batch.operator)}</td>
                    <td>${escapeHtml(batch.totalCodes)}</td>
                    <td>${escapeHtml(batch.productTypes)}</td>
                    <td>${escapeHtml(batch.dealer || "Unallocated")}</td>
                    <td>${statusBadge(batch.status)}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function dealerRankingTable() {
    const rows = data.dealers
      .map((dealer) => ({
        dealer,
        count: data.warrantyRecords.filter((record) => record.dealerCode === dealer.code).length,
      }))
      .sort((a, b) => b.count - a.count);
    return `
      <div class="table-wrap compact-table">
        <table>
          <thead><tr><th>Dealer</th><th>Country</th><th>Records</th><th>Points</th></tr></thead>
          <tbody>${rows
            .map(
              (row) => `
                <tr><td>${escapeHtml(row.dealer.name)}</td><td>${escapeHtml(row.dealer.country)}</td><td>${row.count}</td><td>${row.dealer.points}</td></tr>
              `,
            )
            .join("")}</tbody>
        </table>
      </div>
    `;
  }

  function productSplitTable() {
    const counts = data.warrantyRecords.reduce((acc, record) => {
      acc[record.productType] = (acc[record.productType] || 0) + 1;
      return acc;
    }, {});
    const rows = Object.keys(counts);
    return `
      <div class="table-wrap compact-table">
        <table>
          <thead><tr><th>Product Type</th><th>Records</th></tr></thead>
          <tbody>${rows.map((type) => `<tr><td>${productLabel(type)}</td><td>${counts[type]}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    `;
  }

  function routeContent(route) {
    if (isRoute(route, "dealer") && route !== AUTH.dealer.loginRoute && !isAuthenticated("dealer")) {
      return renderDealerLogin();
    }
    if (isRoute(route, "admin") && route !== AUTH.admin.loginRoute && !isAuthenticated("admin")) {
      return renderAdminLogin();
    }
    if (route === "home") return renderHome();
    if (route === "verify") return renderVerify();
    if (route === "terms") return renderTerms();
    if (route === "dealer/login") return renderDealerLogin();
    if (route === "dealer/dashboard") return renderDealerDashboard();
    if (route === "dealer/register-warranty") return renderDealerRegister();
    if (route === "dealer/warranty-records") return renderDealerRecords();
    if (route === "dealer/points") return renderDealerPoints();
    if (route === "dealer/rewards") return renderDealerRewards();
    if (route === "admin/login") return renderAdminLogin();
    if (route === "admin/dashboard") return renderAdminDashboard();
    if (route === "admin/products") return renderAdminProducts();
    if (route === "admin/dealers") return renderAdminDealers();
    if (route === "admin/warranty-codes") return renderAdminWarrantyCodes();
    if (route === "admin/import") return renderAdminImport();
    if (route === "admin/allocation") return renderAdminAllocation();
    if (route === "admin/reviews") return renderAdminReviews();
    if (route === "admin/points") return renderAdminPoints();
    if (route === "admin/rewards") return renderAdminRewards();
    if (route === "admin/redemptions") return renderAdminRedemptions();
    if (route === "admin/export") return renderAdminExport();
    return renderHome();
  }

  function render() {
    const route = getRoute();
    const workspace = isWorkspaceRoute(route);
    const shouldResetScroll = route !== lastRenderedRoute;
    document.documentElement.lang = lang();
    app.innerHTML = `
      <div class="portal-shell ${workspace ? "is-workspace-shell" : ""}">
        ${workspace ? "" : renderHeader(route)}
        ${routeContent(route)}
        ${workspace ? "" : renderFooter()}
        ${ui.toast ? `<div class="toast">${escapeHtml(ui.toast)}</div>` : ""}
      </div>
    `;
    localizeRenderedPage();
    if (shouldResetScroll) {
      resetPageScroll();
    }
    lastRenderedRoute = route;
  }

  function resetPageScroll() {
    window.scrollTo(0, 0);
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
    window.setTimeout(() => window.scrollTo(0, 0), 0);
    window.setTimeout(() => window.scrollTo(0, 0), 160);
  }

  function showToast(message) {
    ui.toast = message;
    render();
    window.setTimeout(() => {
      ui.toast = "";
      render();
    }, 2400);
  }

  function setRoute(route) {
    const nextHash = `#/${route}`;
    if (window.location.hash === nextHash) {
      render();
      return;
    }
    window.location.hash = nextHash;
  }

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("[data-action='language']")) {
      localStorage.setItem("hhWarrantyLang", target.value);
      render();
      return;
    }
    if (target.id === "dealer-code-select") {
      const summary = document.getElementById("dealer-code-summary");
      const code = codeByValue(target.value);
      if (summary && code) summary.innerHTML = renderCodeSummary(code);
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    const formType = form.getAttribute("data-form");
    if (!formType) return;
    event.preventDefault();
    if (formType === "verify") handleVerify(form);
    if (formType === "dealer-login") authenticate("dealer", form);
    if (formType === "admin-login") authenticate("admin", form);
    if (formType === "register-warranty") handleRegisterWarranty(form);
    if (formType === "allocate-code") handleAllocateCode(form);
    if (formType === "points-settings") handlePointsSettings(form);
    if (formType === "manual-points") handleManualPoints(form);
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target || target.matches("select")) return;
    const action = target.getAttribute("data-action");
    if (action === "sample-vin") {
      sessionStorage.setItem("hhVerifyVin", "XTA210990R1234567");
      ui.selectedRecordId = "";
      if (getRoute() === "verify") {
        render();
      } else {
        setRoute("verify");
      }
    }
    if (action === "select-record") {
      ui.selectedRecordId = target.getAttribute("data-id");
      render();
    }
    if (action === "print-certificate") printCertificate(target.getAttribute("data-id"));
    if (action === "redeem") handleRedeem(target.getAttribute("data-id"));
    if (action === "approve-review") handleReview(target.getAttribute("data-id"), true);
    if (action === "reject-review") handleReview(target.getAttribute("data-id"), false);
    if (action === "download-template") downloadTemplate();
    if (action === "run-import-demo") runImportDemo();
    if (action === "reset-demo") resetDemoData();
    if (action === "cycle-reward-status") cycleRewardStatus(target.getAttribute("data-id"));
    if (action === "approve-redemption") handleRedemption(target.getAttribute("data-id"), "Approved, Waiting for Next Shipment");
    if (action === "reject-redemption") handleRedemption(target.getAttribute("data-id"), "Rejected");
    if (action === "ship-redemption") handleRedemption(target.getAttribute("data-id"), "Shipped with Order");
    if (action === "export-warranties") exportWarranties();
    if (action === "export-points") exportPoints();
    if (action === "export-redemptions") exportRedemptions();
    if (action === "dealer-logout") signOut("dealer");
    if (action === "admin-logout") signOut("admin");
  });

  function handleVerify(form) {
    const vin = new FormData(form).get("vin").trim().toUpperCase();
    sessionStorage.setItem("hhVerifyVin", vin);
    ui.selectedRecordId = "";
    if (getRoute() === "verify") {
      render();
    } else {
      setRoute("verify");
    }
  }

  function handleRegisterWarranty(form) {
    const formData = new FormData(form);
    const code = codeByValue(formData.get("warrantyCode"));
    const dealer = activeDealer();
    if (!code) {
      showToast("Please select a valid warranty code.");
      return;
    }
    const files = form.elements.photos.files || [];
    if (files.length < 1 || files.length > 3) {
      showToast("Please upload 1 to 3 installation photos.");
      return;
    }
    const installDate = formData.get("installationDate") || today();
    const id = `WR-${new Date().getFullYear()}-${String(data.warrantyRecords.length + 1).padStart(4, "0")}`;
    data.warrantyRecords.unshift({
      id,
      warrantyCode: code.code,
      vin: formData.get("vin").trim().toUpperCase(),
      customerName: formData.get("customerName") || "Owner",
      vehicleMake: formData.get("vehicleMake") || "Vehicle",
      vehicleModel: formData.get("vehicleModel") || "Model",
      vehicleYear: formData.get("vehicleYear") || "",
      productType: code.productType,
      productName: code.productName,
      installationCategory: formData.get("installationCategory"),
      installationDate: installDate,
      warrantyExpiryDate: "",
      dealerCode: dealer.code,
      dealerName: dealer.name,
      country: dealer.country,
      city: dealer.city,
      status: "Pending Review",
      photos: Array.from(files).map((file) => file.name),
      reviewNote: formData.get("remark") || "",
      pointsAwarded: 0,
    });
    if (code.usageType === "Single") {
      code.status = "Pending Review";
    }
    saveData();
    showToast("Warranty submitted for HQ review.");
    setRoute("dealer/warranty-records");
  }

  function handleAllocateCode(form) {
    const formData = new FormData(form);
    const code = codeByValue(formData.get("warrantyCode"));
    const dealer = dealerByCode(formData.get("dealerCode"));
    if (!code || !dealer) return;
    code.dealerCode = dealer.code;
    code.status = "Allocated";
    saveData();
    showToast(`Allocated ${code.code} to ${dealer.name}.`);
  }

  function handlePointsSettings(form) {
    const formData = new FormData(form);
    data.settings.defaultWarrantyPoints = Number(formData.get("defaultWarrantyPoints"));
    data.settings.pointsValidityMonths = Number(formData.get("pointsValidityMonths"));
    saveData();
    showToast("Points settings saved.");
  }

  function handleManualPoints(form) {
    const formData = new FormData(form);
    const dealer = dealerByCode(formData.get("dealerCode"));
    const points = Number(formData.get("pointsChange"));
    if (!dealer || !Number.isFinite(points)) return;
    dealer.points += points;
    data.pointsLedger.unshift({
      id: `PT-${new Date().getFullYear()}-${String(data.pointsLedger.length + 1).padStart(4, "0")}`,
      dealerCode: dealer.code,
      dealerName: dealer.name,
      change: points,
      type: "Manual Adjustment",
      reason: formData.get("reason") || "Manual adjustment",
      operator: "HQ Admin",
      time: nowLabel(),
    });
    saveData();
    showToast("Manual points adjustment applied.");
  }

  function handleRedeem(rewardId) {
    const reward = data.rewards.find((item) => item.id === rewardId);
    const dealer = activeDealer();
    if (!reward) return;
    data.redemptions.unshift({
      id: `RD-${new Date().getFullYear()}-${String(data.redemptions.length + 1).padStart(4, "0")}`,
      dealerCode: dealer.code,
      dealerName: dealer.name,
      rewardId: reward.id,
      rewardName: reward.name,
      points: reward.points,
      quantity: 1,
      status: "Pending Review",
      remark: "Frozen points until HQ review.",
      time: nowLabel(),
    });
    saveData();
    showToast("Redemption request submitted. Points are frozen for review.");
  }

  function handleReview(recordId, approved) {
    const record = data.warrantyRecords.find((item) => item.id === recordId);
    if (!record) return;
    const code = codeByValue(record.warrantyCode);
    const dealer = dealerByCode(record.dealerCode);
    if (!approved) {
      record.status = "Rejected";
      record.reviewNote = "Rejected by HQ. Dealer should correct information and resubmit.";
      if (code && code.status === "Pending Review") code.status = "Allocated";
      saveData();
      showToast("Warranty record rejected.");
      return;
    }

    record.status = "Active";
    record.warrantyExpiryDate = addYears(record.installationDate, code ? code.warrantyYears : 1);
    record.reviewNote = "Approved by HQ.";
    record.pointsAwarded = data.settings.defaultWarrantyPoints;

    if (code) {
      code.usedCount = Number(code.usedCount) + 1;
      const remaining = Number(code.usageLimit) - Number(code.usedCount);
      code.status = remaining <= 0 ? "Exhausted" : "Allocated";
      if (code.usageType === "Single") code.status = "Active";
    }

    if (dealer) {
      dealer.points += data.settings.defaultWarrantyPoints;
      data.pointsLedger.unshift({
        id: `PT-${new Date().getFullYear()}-${String(data.pointsLedger.length + 1).padStart(4, "0")}`,
        dealerCode: dealer.code,
        dealerName: dealer.name,
        change: data.settings.defaultWarrantyPoints,
        type: "Warranty Approval",
        reason: `${record.id} approved`,
        operator: "System",
        time: nowLabel(),
      });
    }

    saveData();
    showToast("Warranty approved, certificate generated, and points awarded.");
  }

  function cycleRewardStatus(rewardId) {
    const reward = data.rewards.find((item) => item.id === rewardId);
    if (!reward) return;
    const statuses = ["Available for Redemption", "Out of Stock", "Coming Soon"];
    const current = statuses.indexOf(reward.status);
    reward.status = statuses[(current + 1) % statuses.length];
    reward.stockStatus = reward.status;
    saveData();
    showToast("Reward status updated.");
  }

  function handleRedemption(redemptionId, status) {
    const redemption = data.redemptions.find((item) => item.id === redemptionId);
    if (!redemption) return;
    const dealer = dealerByCode(redemption.dealerCode);
    if (status === "Approved, Waiting for Next Shipment" && redemption.status === "Pending Review" && dealer) {
      dealer.points -= redemption.points * redemption.quantity;
    }
    redemption.status = status;
    redemption.remark =
      status === "Rejected"
        ? "Frozen points released."
        : status === "Shipped with Order"
          ? "Marked as shipped with order."
          : "Approved for next shipment.";
    saveData();
    showToast(`Redemption status updated to ${status}.`);
  }

  function downloadTemplate() {
    const rows = [
      {
        warrantyCode: "HH-PPF-2026-0100",
        factoryRollNo: "FR-PPF-9001",
        batchNo: "B-PPF-2026-08",
        productType: "PPF",
        productName: "Ultra Clear PPF",
        warrantyYears: "10",
        usageType: "Single",
        usageLimit: "1",
        dealerCode: "RU-MSK-001",
        shipmentNo: "HH-RU-2026-08-A",
        shipmentDate: "2026-08-01",
        remark: "Sample row",
      },
    ];
    downloadCsv("hh-warranty-code-template.csv", rows);
  }

  function runImportDemo() {
    const id = `IMP-${new Date().getFullYear()}-${String(data.importBatches.length + 1).padStart(4, "0")}`;
    data.importBatches.unshift({
      id,
      name: "Validation demo import",
      time: nowLabel(),
      operator: "HQ Admin",
      totalCodes: 1,
      productTypes: "PPF",
      dealer: "Unallocated",
      status: "Imported",
      remark: "All rows passed validation.",
    });
    data.warrantyCodes.unshift({
      code: `HH-PPF-${new Date().getFullYear()}-${String(1000 + data.warrantyCodes.length)}`,
      factoryRollNo: "FR-DEMO",
      batchNo: "B-DEMO",
      shipmentNo: "",
      productType: "PPF",
      productName: "Ultra Clear PPF",
      warrantyYears: 10,
      usageType: "Single",
      usageLimit: 1,
      usedCount: 0,
      dealerCode: "",
      importBatch: id,
      status: "Unallocated",
      remark: "Created by validation demo.",
    });
    saveData();
    showToast("Import validation passed and one demo code was added.");
  }

  function resetDemoData() {
    data = JSON.parse(JSON.stringify(seedData));
    saveData();
    sessionStorage.removeItem("hhVerifyVin");
    ui = { selectedRecordId: "", toast: "" };
    showToast("Demo data reset.");
  }

  function exportWarranties() {
    downloadCsv("hh-warranty-records.csv", data.warrantyRecords);
  }

  function exportPoints() {
    downloadCsv("hh-points-ledger.csv", data.pointsLedger);
  }

  function exportRedemptions() {
    downloadCsv("hh-redemption-requests.csv", data.redemptions);
  }

  function downloadCsv(filename, rows) {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => {
            const value = String(row[header] ?? "").replaceAll('"', '""');
            return `"${value}"`;
          })
          .join(","),
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function printCertificate(recordId) {
    const record = data.warrantyRecords.find((item) => item.id === recordId);
    if (!record || record.status !== "Active") {
      showToast("Certificate is available after HQ approval.");
      return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showToast("Popup blocked. Please allow popups to print certificates.");
      return;
    }
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${escapeHtml(record.warrantyCode)} - H&H Warranty Certificate</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
          <main class="page">
            <div class="page-inner">
              ${renderCertificate(record, false)}
            </div>
          </main>
          <script>window.addEventListener("load", () => window.print());<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  window.addEventListener("hashchange", render);
  if (!window.location.hash) {
    window.location.hash = "#/";
  }
  render();
})();
