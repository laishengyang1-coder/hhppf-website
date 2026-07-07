(function () {
  "use strict";

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const STORAGE_KEY = "hhWarrantyPortalV1";
  const VERSION = 3;
  const AUTH = {
    dealer: {
      sessionKey: "hhDealerAuthed",
      codeKey: "hhDealerCode",
      dashboardRoute: "dealer/dashboard",
      loginRoute: "dealer/login",
    },
    admin: {
      email: "anhuiheheppf",
      password: "hhppf",
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
      "Available materials": "可兑换物料清单",
      "Current catalog. HQ manages inventory quantity; dealer only sees exchange status and point cost.": "当前可申请物料清单。总部管理库存数量，经销商端只显示兑换状态和所需积分。",
      "Select materials for this request": "选择本次申请物料",
      "Enter quantities below. The system will calculate line totals and submit the whole request to HQ for review.": "在下方填写数量，系统会自动计算每项小计，并将整单提交给总部审核。",
      "Material": "物料",
      "Unit points": "单件积分",
      "Quantity": "数量",
      "Line total": "小计积分",
      "Request summary": "申请汇总",
      "No materials selected yet.": "暂未选择物料。",
      "Select materials and quantities to calculate points.": "选择物料和数量后会自动计算积分。",
      "Ready to submit for HQ review.": "可以提交给总部审核。",
      "Selected total exceeds available points.": "已选总积分超过可用积分。",
      "Submit Redemption Request": "提交兑换申请",
      "Redemption history": "兑换申请历史",
      "Track HQ review progress and previous material requests.": "查看总部审核进展，以及历史申请的物料明细。",
      "Materials": "物料明细",
      "Qty": "数量",
      "Status": "状态",
      "Action": "操作",
      "Frozen points:": "冻结积分：",
      "No redemption requests yet.": "暂无兑换申请。",
      "Please select at least one material before submitting.": "请先至少选择一种物料。",
      "Selected materials exceed available points.": "已选物料超过可用积分。",
      "Redemption request submitted to HQ for review.": "兑换申请已提交给总部审核。",
      "Pending HQ review. Points are frozen until review.": "等待总部审核。积分将在审核期间冻结。",
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
      "Ship": "标记发货",
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
      "Pending Review": "待审核",
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
      "Specialty Film": "特种功能膜",
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
      /* ── New: Product Management ── */
      "Add / Edit Product": "新增 / 编辑产品",
      "Product Type": "产品类型",
      "External Model": "外部型号",
      "Save Product": "保存产品",
      "Update Product": "更新产品",
      "Reset Form": "重置表单",
      "Product Catalog": "产品目录",
      "External": "外部型号",
      "Actions": "操作",
      "Edit": "编辑",
      "Delete": "删除",
      "Product name is required.": "请输入产品名称。",
      "Delete this product? This cannot be undone.": "确定删除此产品？此操作不可撤销。",
      "PPF (Paint Protection Film)": "PPF（车衣保护膜）",
      /* ── New: Dealer Management ── */
      "Create / Edit Dealer": "创建 / 编辑经销商",
      "Dealer Code": "经销商代码",
      "Dealer Name": "经销商名称",
      "Username": "用户名",
      "Password": "密码",
      "Login username": "登录用户名",
      "Login password": "登录密码",
      "Save Dealer": "保存经销商",
      "Update Dealer": "更新经销商",
      "Dealer List": "经销商列表",
      "Country Partner": "国家级合作伙伴",
      "Regional Dealer": "区域经销商",
      "City Dealer": "城市经销商",
      "Shop": "门店",
      "HQ": "总部",
      "Inactive": "已停用",
      "Parent Dealer": "上级经销商",
      "Dealer code is required.": "请输入经销商代码。",
      "Username is required for login.": "请输入登录用户名。",
      "Dealer name is required.": "请输入经销商名称。",
      "Password is required for new dealer.": "新建经销商必须设置密码。",
      "Dealer code already exists. Use a unique code.": "经销商代码已存在，请使用唯一代码。",
      "Delete this dealer? Warranty codes and records associated with this dealer will be preserved but the account will no longer be accessible. Continue?": "确定删除此经销商？关联的质保码和记录将保留，但该账号将无法登录。是否继续？",
      "Create and manage dealer accounts. Each dealer will use the assigned username and password to log into the Dealer Portal.": "创建并管理经销商账号。每个经销商将使用分配的用户名和密码登录经销商端。",
      /* ── New: Auth / Login ── */
      "Sign In": "登录",
      "Use the account created by HQ to log in.": "请使用总部为您创建的账号登录。",
      "Your dealer username": "您的经销商用户名",
      "Your password": "您的密码",
      "Your admin account": "您的总部账号",
      "Account name": "账号",
      "Enter Admin Console": "进入总部后台",
      "Invalid dealer account or password, or account is not active.": "经销商账号或密码不正确，或账号已停用。",
      "Dealer code:": "经销商代码：",
      "Level:": "等级：",
      "Country:": "国家：",
      "Per code or no limit": "按质保码或无限制",
      /* ── Login page lead paragraphs ── */
      "Authorized dealers register warranties, upload installation photos, track review status, and redeem partner points.": "授权经销商可登记质保、上传施工照片、跟踪审核状态并兑换伙伴积分。",
      "Partner Points": "伙伴积分",
      "HQ administrators manage products, dealers, factory warranty codes, reviews, points, rewards, and export workflows.": "总部管理员负责管理产品、经销商、工厂质保码、审核、积分、兑换物料和数据导出流程。",
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
      "Available materials": "Доступные материалы",
      "Current catalog. HQ manages inventory quantity; dealer only sees exchange status and point cost.": "Текущий каталог. HQ управляет складским количеством; дилер видит только статус обмена и стоимость в баллах.",
      "Select materials for this request": "Выберите материалы для заявки",
      "Enter quantities below. The system will calculate line totals and submit the whole request to HQ for review.": "Введите количество ниже. Система рассчитает строки и отправит всю заявку на проверку HQ.",
      "Material": "Материал",
      "Unit points": "Баллы за единицу",
      "Quantity": "Количество",
      "Line total": "Итого по строке",
      "Request summary": "Сводка заявки",
      "No materials selected yet.": "Материалы пока не выбраны.",
      "Select materials and quantities to calculate points.": "Выберите материалы и количество для расчета баллов.",
      "Ready to submit for HQ review.": "Готово к отправке на проверку HQ.",
      "Selected total exceeds available points.": "Выбранная сумма превышает доступные баллы.",
      "Submit Redemption Request": "Отправить заявку на обмен",
      "Redemption history": "История заявок",
      "Track HQ review progress and previous material requests.": "Отслеживайте проверку HQ и прошлые заявки на материалы.",
      "Materials": "Материалы",
      "Qty": "Кол-во",
      "Status": "Статус",
      "Action": "Действие",
      "Frozen points:": "Замороженные баллы:",
      "No redemption requests yet.": "Заявок на обмен пока нет.",
      "Please select at least one material before submitting.": "Выберите хотя бы один материал перед отправкой.",
      "Selected materials exceed available points.": "Выбранные материалы превышают доступные баллы.",
      "Redemption request submitted to HQ for review.": "Заявка отправлена в HQ на проверку.",
      "Pending HQ review. Points are frozen until review.": "Ожидает проверки HQ. Баллы заморожены до проверки.",
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
      "Ship": "Отметить отправку",
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
      "Pending Review": "На проверке",
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
      "Specialty Film": "Специальная пленка",
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
      /* ── New: Product Management ── */
      "Add / Edit Product": "Добавить / изменить продукт",
      "Product Type": "Тип продукта",
      "External Model": "Внешняя модель",
      "Save Product": "Сохранить продукт",
      "Update Product": "Обновить продукт",
      "Reset Form": "Сбросить форму",
      "Product Catalog": "Каталог продуктов",
      "External": "Внешн.",
      "Actions": "Действия",
      "Edit": "Изменить",
      "Delete": "Удалить",
      "Product name is required.": "Название продукта обязательно.",
      "Delete this product? This cannot be undone.": "Удалить этот продукт? Это необратимо.",
      "PPF (Paint Protection Film)": "PPF (защитная пленка)",
      /* ── New: Dealer Management ── */
      "Create / Edit Dealer": "Создать / изменить дилера",
      "Dealer Code": "Код дилера",
      "Dealer Name": "Название дилера",
      "Username": "Логин",
      "Password": "Пароль",
      "Login username": "Логин",
      "Login password": "Пароль для входа",
      "Save Dealer": "Сохранить дилера",
      "Update Dealer": "Обновить дилера",
      "Dealer List": "Список дилеров",
      "Country Partner": "Нац. партнер",
      "Regional Dealer": "Рег. дилер",
      "City Dealer": "Городской дилер",
      "Shop": "Магазин",
      "HQ": "HQ",
      "Inactive": "Неактивен",
      "Parent Dealer": "Родительский дилер",
      "Dealer code is required.": "Код дилера обязателен.",
      "Username is required for login.": "Логин обязателен.",
      "Dealer name is required.": "Название дилера обязательно.",
      "Password is required for new dealer.": "Пароль обязателен для нового дилера.",
      "Dealer code already exists. Use a unique code.": "Код дилера уже существует. Используйте уникальный код.",
      "Delete this dealer? Warranty codes and records associated with this dealer will be preserved but the account will no longer be accessible. Continue?": "Удалить дилера? Гарантийные коды и записи сохранятся, но аккаунт станет недоступен. Продолжить?",
      "Create and manage dealer accounts. Each dealer will use the assigned username and password to log into the Dealer Portal.": "Создавайте и управляйте аккаунтами дилеров. Каждый дилер использует назначенные логин и пароль для входа в портал дилера.",
      /* ── New: Auth / Login ── */
      "Sign In": "Войти",
      "Use the account created by HQ to log in.": "Используйте аккаунт, созданный HQ.",
      "Your dealer username": "Ваш логин дилера",
      "Your password": "Ваш пароль",
      "Your admin account": "Ваш админ-аккаунт",
      "Account name": "Аккаунт",
      "Enter Admin Console": "Войти в админ-панель",
      "Invalid dealer account or password, or account is not active.": "Неверный аккаунт дилера, пароль или аккаунт неактивен.",
      "Dealer code:": "Код дилера:",
      "Level:": "Уровень:",
      "Country:": "Страна:",
      "Per code or no limit": "На код или без лимита",
      /* ── Login page lead paragraphs ── */
      "Authorized dealers register warranties, upload installation photos, track review status, and redeem partner points.": "Авторизованные дилеры регистрируют гарантии, загружают фото установки, отслеживают статус проверки и обменивают партнерские баллы.",
      "Partner Points": "Партнерские баллы",
      "HQ administrators manage products, dealers, factory warranty codes, reviews, points, rewards, and export workflows.": "Администраторы HQ управляют продуктами, дилерами, заводскими кодами, проверками, баллами, материалами и экспортом.",
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
      "Current points:": "当前积分：",
      "Frozen points:": "冻结积分：",
      "points": "积分",
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
      "Current points:": "Текущие баллы:",
      "Frozen points:": "Замороженные баллы:",
      "points": "баллов",
      /* ── New dynamic phrases ── */
      "Allocated": "Назначен",
      "to": "→",
      "Help": "Помощь",
      "Contact": "Контакты",
      "support@hhppf.com": "support@hhppf.com",
      "V1 Preview": "V1 Прототип",
      "External:": "Внешняя модель:",
      "Remark:": "Примечание:",
      "Warranty Years:": "Лет гарантии:",
      "Code:": "Код:",
      "Name:": "Название:",
      "Years:": "Лет:",
      "Points:": "Баллы:",
      "Status:": "Статус:",
    },
  };

  const seedData = {
    version: VERSION,
    settings: {
      defaultWarrantyPoints: 100,
      pointsValidityMonths: 12,
    },
    products: [
      /* ── PPF / Paint Protection Film 车衣系列 ── */
      {
        type: "PPF",
        name: "HEHE PPF Classic 190",
        externalModel: "HH Classic 190",
        warrantyYears: 5,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Entry-level, 7.5mil, flexible & easy installation. 5-year warranty.",
      },
      {
        type: "PPF",
        name: "HEHE PPF Plus 190",
        externalModel: "HH Plus 190",
        warrantyYears: 5,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Mid-range, 7.5mil, lotus effect coating, balanced strength & toughness. 5-year warranty.",
      },
      {
        type: "PPF",
        name: "HEHE PPF Pro 210",
        externalModel: "HH Pro 210",
        warrantyYears: 12,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Mid-high, 8.5mil, high transparency & elongation, polycarbon hydrophobic coating. 12-year warranty.",
      },
      {
        type: "PPF",
        name: "HEHE PPF Ultra 240",
        externalModel: "HH Ultra 240",
        warrantyYears: 10,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Premium, 9.5mil, Lubrizol particles, high gloss & anti-stain, superior hydrophobicity. 10-year warranty.",
      },
      {
        type: "PPF",
        name: "HEHE Matte PPF",
        externalModel: "HH Matte",
        warrantyYears: 5,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Matte finish, 7.5mil, silky surface, excellent strength & workability. 5-year warranty.",
      },
      /* ── Dual Silver Window Film 双银安全系列 ── */
      {
        type: "WINDOW_FILM",
        name: "HEHE Dual Silver Series DS 70",
        externalModel: "HH DS70",
        warrantyYears: 10,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Front windshield, VLT 70%, IR rejection 95%, TSER 58%. 10-year warranty.",
      },
      {
        type: "WINDOW_FILM",
        name: "HEHE Dual Silver Series DS 20",
        externalModel: "HH DS20",
        warrantyYears: 10,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Side/rear windows, VLT 25%, IR rejection 95%, TSER 65%. 10-year warranty.",
      },
      /* ── UV Shield Window Film 纳米陶瓷护肤系列 ── */
      {
        type: "WINDOW_FILM",
        name: "HEHE UV Shield Series UV70",
        externalModel: "HH UV70",
        warrantyYears: 10,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Front windshield, VLT 70%, UV block 100%, IR rejection 95%, TSER 48%. 10-year warranty.",
      },
      {
        type: "WINDOW_FILM",
        name: "HEHE UV Shield Series UV15",
        externalModel: "HH UV15",
        warrantyYears: 10,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Side/rear windows, VLT 18%, UV block 100%, IR rejection 95%, TSER 66%. 10-year warranty.",
      },
      /* ── Ceramic IR Window Film 5G纳米陶瓷系列 ── */
      {
        type: "WINDOW_FILM",
        name: "HEHE Ceramic IR CIR70",
        externalModel: "HH CIR70",
        warrantyYears: 10,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Front windshield, VLT 75%, UV block ≥99%, IR rejection 92%, TSER 46%. 10-year warranty.",
      },
      {
        type: "WINDOW_FILM",
        name: "HEHE Ceramic IR CIR15",
        externalModel: "HH CIR15",
        warrantyYears: 10,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Side/rear windows, VLT 20%, UV block ≥99%, IR rejection 94%, TSER 63%. 10-year warranty.",
      },
      /* ── Color Shift Window Film 千层炫彩系列 ── */
      {
        type: "WINDOW_FILM",
        name: "HEHE Color Shift GQCM70",
        externalModel: "HH GQCM70",
        warrantyYears: 8,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Color-shift film, VLT 70%, IR rejection 92%, TSER 55%, 4mil. 8-year warranty.",
      },
      {
        type: "WINDOW_FILM",
        name: "HEHE Color Shift QCM75",
        externalModel: "HH QCM75",
        warrantyYears: 8,
        usageType: "Multi",
        defaultUsageLimit: 24,
        status: "Active",
        remark: "Color-shift film, VLT 75%, IR rejection 92%, TSER 49%, 3mil. 8-year warranty.",
      },
      /* ── TPU Color PPF 改色系列 ── */
      {
        type: "TPU_COLOR_PPF",
        name: "TPU Color PPF Crystal Series",
        externalModel: "HH TPU Color Crystal",
        warrantyYears: 5,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Entry solid colors, 7.5mil TPU. 5-year warranty.",
      },
      {
        type: "TPU_COLOR_PPF",
        name: "TPU Color PPF Metallic Series",
        externalModel: "HH TPU Color Metallic",
        warrantyYears: 5,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Mid-range pearl/metallic finish, 7.5mil TPU. 5-year warranty.",
      },
      {
        type: "TPU_COLOR_PPF",
        name: "TPU Color PPF Satin Series",
        externalModel: "HH TPU Color Satin",
        warrantyYears: 5,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Premium satin matte finish, 7.5mil TPU. 5-year warranty.",
      },
      {
        type: "TPU_COLOR_PPF",
        name: "TPU Color PPF Color Shift Series",
        externalModel: "HH TPU Color Shift",
        warrantyYears: 5,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Premium chameleon color-shift effect, 7.5mil TPU. 5-year warranty.",
      },
      /* ── Specialty Films 其他功能性膜材 ── */
      {
        type: "SPECIAL_FILM",
        name: "HEHE Architectural Film",
        externalModel: "HH Architectural Film",
        warrantyYears: 10,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Commercial building glass film, PET material, 1.52×30m. 10-year warranty.",
      },
      {
        type: "SPECIAL_FILM",
        name: "HEHE Interior Film",
        externalModel: "HH Interior Film",
        warrantyYears: 10,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Interior decoration film, PET material, 1.52×30m. 10-year warranty.",
      },
      {
        type: "SPECIAL_FILM",
        name: "HEHE Skylight Armor",
        externalModel: "HH Skylight Armor",
        warrantyYears: 3,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Sunroof protection, 6.5mil TPU, high UV/IR block. 3-year warranty.",
      },
      {
        type: "SPECIAL_FILM",
        name: "HEHE Safety Shield",
        externalModel: "HH Safety Shield",
        warrantyYears: 1,
        usageType: "Single",
        defaultUsageLimit: 1,
        status: "Active",
        remark: "Glass protection, 6mil EPU, high strength & transparency, self-healing coating. 1-year warranty.",
      },
      /* ── Manual / Partial ── */
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
        username: "moscow",
        password: "hhppf",
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
        username: "spb",
        password: "hhppf",
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
        productName: "HEHE PPF Pro 210",
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
        productName: "HEHE Ceramic IR CIR70",
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
        productName: "TPU Color PPF Crystal Series",
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
        productName: "HEHE PPF Pro 210",
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
        productName: "HEHE PPF Pro 210",
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
        productName: "HEHE Ceramic IR CIR70",
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
        productName: "TPU Color PPF Crystal Series",
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
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const account = AUTH[role];
    if (role === "admin") {
      if (email !== account.email || password !== account.password) {
        showToast("Invalid admin account or password.");
        return;
      }
    } else if (role === "dealer") {
      const matchedDealer = data.dealers.find(
        (d) => d.username === email && d.password === password && d.status === "Active",
      );
      if (!matchedDealer) {
        showToast("Invalid dealer account or password, or account is not active.");
        return;
      }
      sessionStorage.setItem(account.codeKey, matchedDealer.code);
    }
    sessionStorage.setItem(account.sessionKey, "true");
    setRoute(account.dashboardRoute);
  }

  function signOut(role) {
    const account = AUTH[role];
    sessionStorage.removeItem(account.sessionKey);
    if (role === "dealer") sessionStorage.removeItem(account.codeKey);
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
      SPECIAL_FILM: "Specialty Film",
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
      SPECIAL_FILM: "Specialty Film",
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
    const dealerCode = sessionStorage.getItem(AUTH.dealer.codeKey);
    if (dealerCode) {
      const found = data.dealers.find((d) => d.code === dealerCode);
      if (found) return found;
    }
    return data.dealers[0];
  }

  function dealerRecords() {
    const dealer = activeDealer();
    return data.warrantyRecords.filter((record) => record.dealerCode === dealer.code);
  }

  function frozenPointsForDealer(dealerCode) {
    return data.redemptions
      .filter((item) => item.dealerCode === dealerCode && item.status === "Pending Review")
      .reduce((sum, item) => sum + redemptionTotalPoints(item), 0);
  }

  function redemptionItems(redemption) {
    if (Array.isArray(redemption.items) && redemption.items.length) {
      return redemption.items.map((item) => ({
        rewardId: item.rewardId,
        rewardName: item.rewardName,
        points: Number(item.points || 0),
        quantity: Number(item.quantity || 0),
      }));
    }
    return [
      {
        rewardId: redemption.rewardId,
        rewardName: redemption.rewardName,
        points: Number(redemption.points || 0),
        quantity: Number(redemption.quantity || 0),
      },
    ];
  }

  function redemptionTotalQuantity(redemption) {
    return redemptionItems(redemption).reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }

  function redemptionTotalPoints(redemption) {
    return redemptionItems(redemption).reduce(
      (sum, item) => sum + Number(item.points || 0) * Number(item.quantity || 0),
      0,
    );
  }

  function redemptionRewardLabel(redemption) {
    return redemptionItems(redemption)
      .map((item) => {
        const quantity = Number(item.quantity || 0);
        const points = Number(item.points || 0);
        return `${item.rewardName} x ${quantity} (${points} x ${quantity} = ${points * quantity} points)`;
      })
      .join(" / ");
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

  function renderFooter(route) {
    if (route === "terms") {
      return `
        <footer class="portal-footer">
          <span>H&amp;H Automotive Films Limited Warranty</span>
          <span><a href="../index.html">${escapeHtml(t("back"))}</a></span>
        </footer>
      `;
    }

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
        ${terms.sections.map(renderTermsBlock).join("")}
      </section>
    `);
  }

  function renderTermsBlock(section) {
    return `
      <article class="terms-block">
        <h2>${escapeHtml(section.title)}</h2>
        ${renderTermsParagraphs(section.paragraphs)}
        ${section.table ? renderTermsTable(section.table) : ""}
        ${
          section.tableNote
            ? `<aside class="terms-note terms-table-note"><p>${escapeHtml(section.tableNote)}</p></aside>`
            : ""
        }
        ${renderTermsParagraphs(section.afterTableParagraphs)}
        ${section.itemsIntro ? `<p>${escapeHtml(section.itemsIntro)}</p>` : ""}
        ${
          section.items
            ? `<ul class="terms-list">${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
            : ""
        }
        ${renderTermsParagraphs(section.afterItems)}
      </article>
    `;
  }

  function renderTermsParagraphs(paragraphs = []) {
    return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  }

  function renderTermsTable(table) {
    return `
      <div class="terms-table-wrap">
        <table class="terms-table">
          <thead>
            <tr>${table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${table.rows
              .map(
                (row) => `
                  <tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function warrantyTermsByLang() {
    const zhTable = {
      headers: ["产品大类", "产品系列 / 产品名称", "默认质保期限", "备注"],
      rows: [
        ["漆面保护膜 / PPF", "HH Classic 190", "5 年", "以电子质保证书为准"],
        ["漆面保护膜 / PPF", "HH Plus 190", "5 年", "以电子质保证书为准"],
        ["漆面保护膜 / PPF", "HH Pro 210", "12 年", "以电子质保证书为准"],
        ["漆面保护膜 / PPF", "HH Ultra 240", "10 年", "以电子质保证书为准"],
        ["漆面保护膜 / PPF", "HH Matte", "5 年", "以电子质保证书为准"],
        ["汽车窗膜 / Window Film", "HH DS70 / HH DS20", "10 年", "以电子质保证书为准"],
        ["汽车窗膜 / Window Film", "HH UV70 / HH UV15", "10 年", "以电子质保证书为准"],
        ["汽车窗膜 / Window Film", "HH CIR70 / HH CIR15", "10 年", "以电子质保证书为准"],
        ["炫彩窗膜 / Color Window Film", "HH GQCM70 / HH QCM75", "8 年", "以电子质保证书为准"],
        ["TPU 改色膜 / TPU Color PPF", "Crystal Series", "5 年", "以电子质保证书为准"],
        ["TPU 改色膜 / TPU Color PPF", "Metallic Series", "5 年", "以电子质保证书为准"],
        ["TPU 改色膜 / TPU Color PPF", "Satin Series", "5 年", "以电子质保证书为准"],
        ["TPU 改色膜 / TPU Color PPF", "Color Shift Series", "5 年", "以电子质保证书为准"],
        ["天窗膜 / Skylight Film", "HH Skylight Armor", "3 年", "以电子质保证书为准"],
        ["玻璃功能膜 / Safety Shield", "HH Safety Shield", "1 年", "以电子质保证书为准"],
        ["建筑膜 / Architectural Film", "HEHE Architectural Film", "以订单或电子质保证书为准", "视产品系列及项目约定"],
        ["家居膜 / Interior Film", "HEHE Interior Film", "以订单或电子质保证书为准", "视产品系列及项目约定"],
      ],
    };
    const enTable = {
      headers: ["Product Category", "Series / Product Name", "Default Warranty Period", "Note"],
      rows: [
        ["Paint Protection Film / PPF", "HH Classic 190", "5 years", "Subject to the electronic warranty certificate"],
        ["Paint Protection Film / PPF", "HH Plus 190", "5 years", "Subject to the electronic warranty certificate"],
        ["Paint Protection Film / PPF", "HH Pro 210", "12 years", "Subject to the electronic warranty certificate"],
        ["Paint Protection Film / PPF", "HH Ultra 240", "10 years", "Subject to the electronic warranty certificate"],
        ["Paint Protection Film / PPF", "HH Matte", "5 years", "Subject to the electronic warranty certificate"],
        ["Automotive Window Film / Window Film", "HH DS70 / HH DS20", "10 years", "Subject to the electronic warranty certificate"],
        ["Automotive Window Film / Window Film", "HH UV70 / HH UV15", "10 years", "Subject to the electronic warranty certificate"],
        ["Automotive Window Film / Window Film", "HH CIR70 / HH CIR15", "10 years", "Subject to the electronic warranty certificate"],
        ["Color Window Film", "HH GQCM70 / HH QCM75", "8 years", "Subject to the electronic warranty certificate"],
        ["TPU Color PPF", "Crystal Series", "5 years", "Subject to the electronic warranty certificate"],
        ["TPU Color PPF", "Metallic Series", "5 years", "Subject to the electronic warranty certificate"],
        ["TPU Color PPF", "Satin Series", "5 years", "Subject to the electronic warranty certificate"],
        ["TPU Color PPF", "Color Shift Series", "5 years", "Subject to the electronic warranty certificate"],
        ["Skylight Film", "HH Skylight Armor", "3 years", "Subject to the electronic warranty certificate"],
        ["Safety Shield", "HH Safety Shield", "1 year", "Subject to the electronic warranty certificate"],
        ["Architectural Film", "HEHE Architectural Film", "Subject to the order or electronic warranty certificate", "Depends on product series and project agreement"],
        ["Interior Film", "HEHE Interior Film", "Subject to the order or electronic warranty certificate", "Depends on product series and project agreement"],
      ],
    };
    const ruTable = {
      headers: ["Категория продукта", "Серия / название продукта", "Стандартный срок гарантии", "Примечание"],
      rows: [
        ["Защитная пленка кузова / PPF", "HH Classic 190", "5 лет", "Согласно электронному гарантийному сертификату"],
        ["Защитная пленка кузова / PPF", "HH Plus 190", "5 лет", "Согласно электронному гарантийному сертификату"],
        ["Защитная пленка кузова / PPF", "HH Pro 210", "12 лет", "Согласно электронному гарантийному сертификату"],
        ["Защитная пленка кузова / PPF", "HH Ultra 240", "10 лет", "Согласно электронному гарантийному сертификату"],
        ["Защитная пленка кузова / PPF", "HH Matte", "5 лет", "Согласно электронному гарантийному сертификату"],
        ["Автомобильная оконная пленка / Window Film", "HH DS70 / HH DS20", "10 лет", "Согласно электронному гарантийному сертификату"],
        ["Автомобильная оконная пленка / Window Film", "HH UV70 / HH UV15", "10 лет", "Согласно электронному гарантийному сертификату"],
        ["Автомобильная оконная пленка / Window Film", "HH CIR70 / HH CIR15", "10 лет", "Согласно электронному гарантийному сертификату"],
        ["Цветная оконная пленка / Color Window Film", "HH GQCM70 / HH QCM75", "8 лет", "Согласно электронному гарантийному сертификату"],
        ["TPU цветная PPF", "Crystal Series", "5 лет", "Согласно электронному гарантийному сертификату"],
        ["TPU цветная PPF", "Metallic Series", "5 лет", "Согласно электронному гарантийному сертификату"],
        ["TPU цветная PPF", "Satin Series", "5 лет", "Согласно электронному гарантийному сертификату"],
        ["TPU цветная PPF", "Color Shift Series", "5 лет", "Согласно электронному гарантийному сертификату"],
        ["Пленка для панорамной крыши / Skylight Film", "HH Skylight Armor", "3 года", "Согласно электронному гарантийному сертификату"],
        ["Функциональная пленка для стекла / Safety Shield", "HH Safety Shield", "1 год", "Согласно электронному гарантийному сертификату"],
        ["Архитектурная пленка / Architectural Film", "HEHE Architectural Film", "Согласно заказу или электронному гарантийному сертификату", "Зависит от серии продукта и условий проекта"],
        ["Интерьерная пленка / Interior Film", "HEHE Interior Film", "Согласно заказу или электронному гарантийному сертификату", "Зависит от серии продукта и условий проекта"],
      ],
    };
    const zhTerms = {
      kicker: "质保条款",
      title: "H&H 汽车膜有限质保条款",
      lead:
        "本条款适用于由 H&H 授权经销商或授权施工门店完成施工，并已在 H&H 电子质保系统中激活的正品汽车膜产品。具体质保产品、产品系列、安装日期、质保期限及质保到期日，以车主电子质保证书记录为准。",
      meta: ["仅适用于授权施工产品", "以电子质保证书为准", "质保期限自安装日期起计算"],
      sections: [
        {
          title: "1. 适用范围",
          paragraphs: [
            "本有限质保条款适用于 H&H 正品漆面保护膜、汽车窗膜、TPU 改色膜及经 H&H 确认适用的相关汽车膜产品。产品必须由 H&H 授权经销商或授权施工门店按照标准流程施工，并完成 H&H 电子质保登记及总部审核。",
            "本条款仅适用于已在 H&H 电子质保系统中显示为有效状态的产品。未完成电子质保登记、质保状态无效、质保信息不完整或产品来源无法核验的情况，不适用本有限质保条款。",
          ],
        },
        {
          title: "2. 产品质保期限",
          table: zhTable,
          tableNote:
            "不同产品系列、批次、销售区域、特殊合作政策或项目订单可能适用不同质保期限。最终质保期限以 H&H 电子质保证书、产品标签、订单文件或双方书面确认内容为准。",
          afterTableParagraphs: [
            "质保期限自产品安装日期起计算。若电子质保证书、订单文件或双方书面确认内容中另有约定，则以对应记录为准。",
          ],
        },
        {
          title: "3. 质保生效条件",
          itemsIntro: "H&H 产品质保需同时满足以下条件方可生效：",
          items: [
            "产品来源于 H&H 正规授权渠道；",
            "产品由 H&H 授权经销商或授权施工门店完成施工；",
            "经销商已在 H&H 电子质保系统中完成质保登记；",
            "质保记录已通过 H&H 总部或授权管理方审核，并显示为有效状态；",
            "车主可提供 VIN、质保记录、安装信息、产品信息或其他必要凭证；",
            "产品使用、清洁和维护方式符合 H&H 产品养护说明。",
          ],
        },
        {
          title: "4. 质保覆盖内容",
          paragraphs: [
            "在正常车辆使用和合理养护条件下，若产品出现经 H&H 或 H&H 授权管理方确认的材料或制造相关质量问题，可按本条款申请质保服务。",
            "不同产品可覆盖的质量问题包括但不限于：",
          ],
          items: [
            "漆面保护膜：非人为造成的明显黄变、开裂、起泡、脱胶、分层或其他经确认的材料失效问题；",
            "汽车窗膜：非人为造成的明显褪色、脱胶、分层、明显褪色或影响正常使用的材料缺陷；",
            "TPU 改色膜：非人为造成的异常开裂、脱胶、分层、明显褪色或材料稳定性问题。",
          ],
          afterItems: [
            "具体是否属于质保范围，应以产品类别、实际安装情况、使用环境、养护情况、电子质保证书记录及 H&H 审核结果为准。",
          ],
        },
        {
          title: "5. 不属于质保范围",
          itemsIntro: "以下情况不属于 H&H 有限质保范围：",
          items: [
            "未经 H&H 授权经销商或授权施工门店施工、拆膜、补膜、重贴或改装所产生的问题；",
            "因施工不当、储存不当、运输损坏、错误使用或未按养护说明维护造成的问题；",
            "因车辆原厂漆面缺陷、二次喷漆、钣喷修复、漆面附着力异常、漆面老化等车辆本身问题导致的异常；",
            "因事故、碰撞、石击、划伤、火烧、水淹、自然灾害、人为破坏、外力撕扯等造成的损坏；",
            "使用强酸、强碱、研磨剂、腐蚀性清洁剂或不当清洁工具造成的问题；",
            "高压水枪近距离冲洗膜边、边角或接缝位置导致的翘边、进水或脱胶；",
            "正常使用过程中产生的轻微磨损、细小划痕、边缘积尘、轻微色差、轻微橘皮或不影响产品正常使用的外观变化；",
            "因未及时处理翘边、破损、污染物、水渍、鸟粪、树胶、沥青、虫胶等造成的进一步损伤；",
            "未在 H&H 电子质保系统中完成登记，或质保状态显示为无效、过期、驳回、作废的产品；",
            "超出电子质保证书载明的质保期限、产品范围、安装部位或适用区域的情况。",
          ],
        },
        {
          title: "6. 质保申请流程",
          paragraphs: [
            "如车主认为产品存在可能属于质保范围的问题，应优先联系原授权施工门店或 H&H 授权经销商，并提供必要信息用于核验。",
          ],
          itemsIntro: "申请质保时，通常需要提供：",
          items: [
            "车辆 VIN；",
            "电子质保证书或质保记录；",
            "产品名称、产品系列或质保编号；",
            "安装日期和安装门店信息；",
            "问题部位的清晰照片或视频；",
            "必要时提供车辆使用、养护、维修或事故记录。",
          ],
          afterItems: [
            "H&H 或授权管理方有权根据实际情况要求补充资料，并对问题原因进行判断。未经确认前，任何维修、更换、拆膜或重贴行为不应视为已获得 H&H 质保承诺。",
          ],
        },
        {
          title: "7. 车主义务",
          paragraphs: [
            "为保持产品性能并降低售后争议，车主应按照 H&H 或授权施工门店提供的养护说明使用和维护产品。",
          ],
          itemsIntro: "车主应注意：",
          items: [
            "施工完成后的初期养护期内，避免洗车、高压冲洗、暴晒后立即冲水或频繁触碰膜边；",
            "日常清洁时使用中性清洁用品和柔软工具；",
            "避免使用强酸、强碱、研磨剂、腐蚀性清洁剂或硬质刮擦工具；",
            "发现翘边、破损、污染物附着或其他异常情况时，应及时联系授权经销商或授权施工门店处理，避免问题扩大；",
            "保留电子质保证书、安装信息及必要的售后沟通记录。",
          ],
        },
        {
          title: "8. 服务方式与责任限制",
          paragraphs: [
            "经 H&H 或授权管理方确认属于质保范围的情况，H&H 可根据具体问题、产品类别、安装范围和当地服务条件，提供合理的质保解决方案。",
          ],
          itemsIntro: "质保解决方式可能包括：",
          items: ["产品更换；", "补发对应材料；", "维修或重贴支持；", "与授权经销商协商的其他合理处理方式。"],
          afterItems: [
            "除非当地法律另有强制规定，H&H 有限质保不涵盖因产品问题间接产生的停用损失、交通费用、保险费用、替代车辆费用、商业损失、时间损失或其他间接、附带、特殊损失。",
          ],
        },
        {
          title: "9. 电子证书与数据说明",
          paragraphs: [
            "H&H 电子质保证书是车主查询和售后沟通的重要凭证。页面可能会对 VIN 等敏感信息进行脱敏展示；用于售后、保险或打印存档的 PDF 证书可显示完整信息。",
            "如纸质质保卡、口头承诺、聊天记录或其他渠道信息与 H&H 电子质保系统记录不一致，以 H&H 电子质保系统中的有效记录为准。",
          ],
        },
        {
          title: "10. 地区适用与条款解释",
          paragraphs: [
            "不同国家或地区的消费者保护法律、产品责任规则、施工环境和售后服务条件可能存在差异。如本条款与当地强制性法律规定不一致，以当地强制性法律规定为准；其余部分继续有效。",
            "H&H 保留在合理范围内更新本有限质保条款的权利。更新后的条款将通过 H&H 官方页面或电子质保系统展示。",
          ],
        },
      ],
    };
    const enTerms = {
      kicker: "Warranty Terms",
      title: "H&H Automotive Film Limited Warranty Terms",
      lead:
        "These terms apply to genuine H&H automotive film products installed by an authorized H&H dealer or authorized installation shop and activated in the H&H electronic warranty system. The covered product, product series, installation date, warranty period and warranty expiry date are subject to the owner's electronic warranty certificate.",
      meta: ["Only for authorized installations", "Electronic warranty certificate prevails", "Warranty period starts from installation date"],
      sections: [
        {
          title: "1. Scope",
          paragraphs: [
            "These limited warranty terms apply to genuine H&H paint protection film, automotive window film, TPU color PPF and related automotive film products confirmed by H&H as eligible. The product must be installed by an authorized H&H dealer or authorized installation shop according to standard procedures, and the H&H electronic warranty registration and headquarters review must be completed.",
            "These terms apply only to products shown as valid in the H&H electronic warranty system. Products without electronic warranty registration, with invalid warranty status, incomplete warranty information or unverifiable product source are not covered by these limited warranty terms.",
          ],
        },
        {
          title: "2. Warranty Period",
          table: enTable,
          tableNote:
            "Different product series, batches, sales regions, special cooperation policies or project orders may apply different warranty periods. The final warranty period is subject to the H&H electronic warranty certificate, product label, order documents or written confirmation by both parties.",
          afterTableParagraphs: [
            "The warranty period is calculated from the product installation date. If the electronic warranty certificate, order documents or written confirmation by both parties provide otherwise, the corresponding record shall prevail.",
          ],
        },
        {
          title: "3. Warranty Activation Conditions",
          itemsIntro: "H&H product warranty becomes effective only when all of the following conditions are met:",
          items: [
            "The product is sourced from a regular H&H authorized channel;",
            "The product is installed by an authorized H&H dealer or authorized installation shop;",
            "The dealer has completed warranty registration in the H&H electronic warranty system;",
            "The warranty record has passed review by H&H headquarters or an authorized management party and is shown as valid;",
            "The owner can provide VIN, warranty record, installation information, product information or other necessary proof;",
            "Product use, cleaning and maintenance comply with H&H product care instructions.",
          ],
        },
        {
          title: "4. Warranty Coverage",
          paragraphs: [
            "Under normal vehicle use and reasonable care, if the product develops a material or manufacturing-related quality issue confirmed by H&H or an H&H authorized management party, warranty service may be requested under these terms.",
            "Covered issues for different products may include, but are not limited to:",
          ],
          items: [
            "Paint protection film: obvious yellowing, cracking, bubbling, adhesive failure, delamination or other confirmed material failure not caused by human factors;",
            "Automotive window film: obvious fading, adhesive failure, delamination, obvious fading or material defects affecting normal use not caused by human factors;",
            "TPU color PPF: abnormal cracking, adhesive failure, delamination, obvious fading or material stability issues not caused by human factors.",
          ],
          afterItems: [
            "Whether a case falls within warranty coverage shall be determined according to product category, actual installation condition, usage environment, care condition, electronic warranty certificate record and H&H review result.",
          ],
        },
        {
          title: "5. Exclusions",
          itemsIntro: "The following situations are not covered by the H&H limited warranty:",
          items: [
            "Issues caused by installation, film removal, patching, re-installation or modification not performed by an authorized H&H dealer or authorized installation shop;",
            "Issues caused by improper installation, improper storage, transportation damage, incorrect use or failure to follow care instructions;",
            "Abnormalities caused by the vehicle itself, including original paint defects, repainting, body and paint repair, abnormal paint adhesion or paint aging;",
            "Damage caused by accident, collision, stone impact, scratches, fire, flooding, natural disaster, intentional damage, pulling by external force or similar causes;",
            "Issues caused by strong acid, strong alkali, abrasives, corrosive cleaners or improper cleaning tools;",
            "Edge lifting, water ingress or adhesive failure caused by close-range pressure washing of film edges, corners or seams;",
            "Minor wear, small scratches, edge dust, slight color difference, slight orange peel or appearance changes during normal use that do not affect normal product use;",
            "Further damage caused by failure to promptly address edge lifting, damage, contaminants, water spots, bird droppings, tree sap, asphalt, insect residue or similar matters;",
            "Products not registered in the H&H electronic warranty system, or products with warranty status shown as invalid, expired, rejected or void;",
            "Any case outside the warranty period, product scope, installation area or applicable region stated in the electronic warranty certificate.",
          ],
        },
        {
          title: "6. Warranty Claim Process",
          paragraphs: [
            "If the owner believes the product may have an issue covered by warranty, the owner should first contact the original authorized installation shop or H&H authorized dealer and provide the necessary information for verification.",
          ],
          itemsIntro: "A warranty claim usually requires:",
          items: [
            "Vehicle VIN;",
            "Electronic warranty certificate or warranty record;",
            "Product name, product series or warranty number;",
            "Installation date and installation shop information;",
            "Clear photos or videos of the affected area;",
            "Vehicle use, care, repair or accident records when necessary.",
          ],
          afterItems: [
            "H&H or an authorized management party may request additional information according to the actual situation and determine the cause of the issue. Before confirmation, any repair, replacement, film removal or re-installation shall not be deemed an H&H warranty commitment.",
          ],
        },
        {
          title: "7. Owner Responsibilities",
          paragraphs: [
            "To maintain product performance and reduce after-sales disputes, the owner should use and maintain the product according to the care instructions provided by H&H or the authorized installation shop.",
          ],
          itemsIntro: "The owner should:",
          items: [
            "During the initial care period after installation, avoid car washing, high-pressure washing, rinsing immediately after sun exposure or frequent touching of film edges;",
            "Use neutral cleaning products and soft tools for daily cleaning;",
            "Avoid strong acid, strong alkali, abrasives, corrosive cleaners or hard scraping tools;",
            "Promptly contact an authorized dealer or authorized installation shop if edge lifting, damage, contaminants or other abnormal conditions appear, so the issue does not expand;",
            "Keep the electronic warranty certificate, installation information and necessary after-sales communication records.",
          ],
        },
        {
          title: "8. Service Method and Limitation of Liability",
          paragraphs: [
            "For cases confirmed by H&H or an authorized management party as covered by warranty, H&H may provide a reasonable warranty solution according to the specific issue, product category, installation scope and local service conditions.",
          ],
          itemsIntro: "Warranty solutions may include:",
          items: ["Product replacement;", "Supply of corresponding material;", "Repair or re-installation support;", "Other reasonable handling methods agreed with the authorized dealer."],
          afterItems: [
            "Unless mandatory local law provides otherwise, the H&H limited warranty does not cover loss of use, transportation costs, insurance costs, substitute vehicle costs, business losses, time losses or other indirect, incidental or special losses arising indirectly from product issues.",
          ],
        },
        {
          title: "9. Electronic Certificate and Data",
          paragraphs: [
            "The H&H electronic warranty certificate is an important document for owner verification and after-sales communication. Pages may mask sensitive information such as VIN; PDF certificates used for after-sales service, insurance or printed archive may display complete information.",
            "If a paper warranty card, verbal promise, chat record or information from another channel is inconsistent with the H&H electronic warranty system record, the valid record in the H&H electronic warranty system shall prevail.",
          ],
        },
        {
          title: "10. Regional Application and Interpretation",
          paragraphs: [
            "Consumer protection laws, product liability rules, installation environments and after-sales service conditions may differ by country or region. If these terms are inconsistent with mandatory local law, mandatory local law shall prevail, and the remaining parts shall continue to be effective.",
            "H&H reserves the right to update these limited warranty terms within a reasonable scope. Updated terms will be displayed through the H&H official page or electronic warranty system.",
          ],
        },
      ],
    };
    const ruTerms = {
      kicker: "Условия гарантии",
      title: "Условия ограниченной гарантии H&H на автомобильные пленки",
      lead:
        "Настоящие условия применяются к оригинальным автомобильным пленкам H&H, установленным авторизованным дилером H&H или авторизованным установочным центром и активированным в электронной системе гарантии H&H. Гарантийный продукт, серия, дата установки, срок гарантии и дата окончания гарантии определяются электронным гарантийным сертификатом владельца.",
      meta: ["Только для авторизованной установки", "Электронный сертификат имеет приоритет", "Срок гарантии считается с даты установки"],
      sections: [
        {
          title: "1. Область действия",
          paragraphs: [
            "Настоящие условия ограниченной гарантии применяются к оригинальным защитным пленкам кузова H&H, автомобильным оконным пленкам, TPU цветным PPF и связанным автомобильным пленочным продуктам, признанным H&H применимыми. Продукт должен быть установлен авторизованным дилером H&H или авторизованным установочным центром по стандартной процедуре, а регистрация в электронной системе гарантии H&H и проверка головным офисом должны быть завершены.",
            "Настоящие условия применяются только к продуктам, которые отображаются в электронной системе гарантии H&H как действительные. Если электронная регистрация гарантии не завершена, статус гарантии недействителен, гарантийная информация неполная или источник продукта невозможно проверить, настоящие условия ограниченной гарантии не применяются.",
          ],
        },
        {
          title: "2. Срок гарантии",
          table: ruTable,
          tableNote:
            "Для разных серий продуктов, партий, регионов продажи, специальных партнерских политик или проектных заказов могут применяться разные сроки гарантии. Окончательный срок гарантии определяется электронным гарантийным сертификатом H&H, маркировкой продукта, заказными документами или письменным подтверждением обеих сторон.",
          afterTableParagraphs: [
            "Срок гарантии исчисляется с даты установки продукта. Если в электронном гарантийном сертификате, заказных документах или письменном подтверждении обеих сторон указаны иные условия, применяются соответствующие записи.",
          ],
        },
        {
          title: "3. Условия вступления гарантии в силу",
          itemsIntro: "Гарантия на продукты H&H вступает в силу только при одновременном соблюдении следующих условий:",
          items: [
            "Продукт получен через официально авторизованный канал H&H;",
            "Продукт установлен авторизованным дилером H&H или авторизованным установочным центром;",
            "Дилер завершил регистрацию гарантии в электронной системе гарантии H&H;",
            "Гарантийная запись прошла проверку головным офисом H&H или авторизованной управляющей стороной и отображается как действительная;",
            "Владелец может предоставить VIN, гарантийную запись, информацию об установке, информацию о продукте или другие необходимые подтверждения;",
            "Использование, очистка и уход за продуктом соответствуют инструкциям H&H по уходу за продуктом.",
          ],
        },
        {
          title: "4. Гарантийное покрытие",
          paragraphs: [
            "При нормальной эксплуатации автомобиля и разумном уходе, если у продукта возникает проблема качества, связанная с материалом или производством и подтвержденная H&H или авторизованной управляющей стороной H&H, владелец может обратиться за гарантийным обслуживанием по настоящим условиям.",
            "Для разных продуктов покрываемые проблемы могут включать, помимо прочего:",
          ],
          items: [
            "Защитная пленка кузова: явное пожелтение, растрескивание, пузыри, отслоение клея, расслоение или иной подтвержденный отказ материала, не вызванный человеческим фактором;",
            "Автомобильная оконная пленка: явное выцветание, отслоение клея, расслоение, явное выцветание или дефекты материала, влияющие на нормальное использование, не вызванные человеческим фактором;",
            "TPU цветная PPF: аномальное растрескивание, отслоение клея, расслоение, явное выцветание или проблемы стабильности материала, не вызванные человеческим фактором.",
          ],
          afterItems: [
            "Отнесение случая к гарантийному покрытию определяется с учетом категории продукта, фактических условий установки, среды эксплуатации, состояния ухода, записи электронного гарантийного сертификата и результата проверки H&H.",
          ],
        },
        {
          title: "5. Исключения из гарантии",
          itemsIntro: "Следующие ситуации не входят в ограниченную гарантию H&H:",
          items: [
            "Проблемы, возникшие из-за установки, снятия пленки, локального ремонта, повторной установки или модификации, выполненных не авторизованным дилером H&H или авторизованным установочным центром;",
            "Проблемы, вызванные неправильной установкой, неправильным хранением, повреждением при транспортировке, неправильным использованием или несоблюдением инструкций по уходу;",
            "Аномалии, вызванные самим автомобилем, включая дефекты заводского ЛКП, повторную окраску, кузовной и окрасочный ремонт, нарушение адгезии краски или старение ЛКП;",
            "Повреждения, вызванные ДТП, столкновением, ударом камней, царапинами, пожаром, затоплением, природными бедствиями, умышленным повреждением, внешним отрывом или аналогичными причинами;",
            "Проблемы, вызванные сильными кислотами, щелочами, абразивами, коррозионными чистящими средствами или неподходящими инструментами очистки;",
            "Поднятие края, попадание воды или отслоение клея из-за мойки высоким давлением с близкого расстояния по краям, углам или швам пленки;",
            "Незначительный износ, мелкие царапины, пыль по краям, небольшое отличие цвета, легкая апельсиновая корка или изменения внешнего вида при нормальном использовании, не влияющие на нормальное применение продукта;",
            "Дальнейшие повреждения из-за несвоевременной обработки поднятых краев, повреждений, загрязнений, водных пятен, птичьего помета, древесной смолы, битума, следов насекомых и подобных факторов;",
            "Продукты, не зарегистрированные в электронной системе гарантии H&H, или продукты со статусом гарантии недействительна, истекла, отклонена или аннулирована;",
            "Случаи, выходящие за пределы гарантийного срока, области продукта, зоны установки или применимого региона, указанных в электронном гарантийном сертификате.",
          ],
        },
        {
          title: "6. Порядок гарантийного обращения",
          paragraphs: [
            "Если владелец считает, что у продукта может быть проблема, относящаяся к гарантии, ему следует сначала обратиться в первоначальный авторизованный установочный центр или к авторизованному дилеру H&H и предоставить необходимую информацию для проверки.",
          ],
          itemsIntro: "Для гарантийного обращения обычно требуется предоставить:",
          items: [
            "VIN автомобиля;",
            "Электронный гарантийный сертификат или гарантийную запись;",
            "Название продукта, серию продукта или гарантийный номер;",
            "Дату установки и информацию об установочном центре;",
            "Четкие фотографии или видео проблемного участка;",
            "При необходимости записи об эксплуатации, уходе, ремонте или ДТП.",
          ],
          afterItems: [
            "H&H или авторизованная управляющая сторона вправе запросить дополнительные материалы в зависимости от фактической ситуации и определить причину проблемы. До подтверждения любые ремонт, замена, снятие пленки или повторная установка не считаются гарантийным обязательством H&H.",
          ],
        },
        {
          title: "7. Обязанности владельца",
          paragraphs: [
            "Для сохранения характеристик продукта и снижения спорных ситуаций после продажи владелец должен использовать и обслуживать продукт согласно инструкциям по уходу, предоставленным H&H или авторизованным установочным центром.",
          ],
          itemsIntro: "Владельцу следует:",
          items: [
            "В начальный период ухода после установки избегать мойки автомобиля, мойки высоким давлением, немедленного ополаскивания после воздействия солнца или частого касания краев пленки;",
            "Для ежедневной очистки использовать нейтральные чистящие средства и мягкие инструменты;",
            "Избегать сильных кислот, щелочей, абразивов, коррозионных чистящих средств или жестких скребков;",
            "При обнаружении поднятия края, повреждений, загрязнений или иных аномалий своевременно обратиться к авторизованному дилеру или установочному центру, чтобы проблема не расширялась;",
            "Сохранять электронный гарантийный сертификат, информацию об установке и необходимые записи послепродажной коммуникации.",
          ],
        },
        {
          title: "8. Способ обслуживания и ограничение ответственности",
          paragraphs: [
            "В случаях, подтвержденных H&H или авторизованной управляющей стороной как гарантийные, H&H может предоставить разумное гарантийное решение с учетом конкретной проблемы, категории продукта, объема установки и местных сервисных условий.",
          ],
          itemsIntro: "Гарантийные решения могут включать:",
          items: ["Замену продукта;", "Предоставление соответствующего материала;", "Поддержку ремонта или повторной установки;", "Иные разумные способы урегулирования, согласованные с авторизованным дилером."],
          afterItems: [
            "Если иное не предусмотрено обязательными нормами местного законодательства, ограниченная гарантия H&H не покрывает простой, транспортные расходы, страховые расходы, расходы на заменяющий автомобиль, коммерческие потери, потерю времени или иные косвенные, сопутствующие или специальные убытки, косвенно возникшие из-за проблемы продукта.",
          ],
        },
        {
          title: "9. Электронный сертификат и данные",
          paragraphs: [
            "Электронный гарантийный сертификат H&H является важным документом для проверки владельцем и послепродажной коммуникации. На страницах могут скрываться чувствительные данные, например VIN; PDF-сертификат для сервиса, страхования или печатного архива может отображать полную информацию.",
            "Если бумажная гарантийная карта, устное обещание, переписка или информация из других каналов противоречат записи в электронной системе гарантии H&H, преимущество имеет действительная запись в электронной системе гарантии H&H.",
          ],
        },
        {
          title: "10. Региональное применение и толкование",
          paragraphs: [
            "Законы о защите потребителей, правила ответственности за продукцию, условия установки и послепродажного обслуживания могут отличаться в разных странах и регионах. Если настоящие условия противоречат обязательным нормам местного законодательства, применяются такие обязательные нормы, а остальные части продолжают действовать.",
            "H&H оставляет за собой право в разумных пределах обновлять настоящие условия ограниченной гарантии. Обновленные условия будут опубликованы на официальной странице H&H или в электронной системе гарантии.",
          ],
        },
      ],
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
          <h3>Sign In</h3>
          <p>Use the account created by HQ to log in.</p>
          <label>Username<input name="email" placeholder="Your dealer username" required /></label>
          <label>Password<input name="password" type="password" placeholder="Your password" required /></label>
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
    const dealer = activeDealer();
    return renderWorkspaceShell({
      active,
      content,
      items,
      kicker: "Dealer Portal",
      title: dealer.name,
      lead: `Dealer code: ${dealer.code} · Level: ${dealer.level || "-"} · Country: ${dealer.country || "-"}`,
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
              <div class="code-combobox">
                <input name="warrantyCode" id="dealer-code-input" autocomplete="off" placeholder="Type or search warranty code..." required />
                <input type="hidden" name="warrantyCodeValue" id="dealer-code-value" />
                <div class="code-combobox-dropdown" id="dealer-code-dropdown" style="display:none;"></div>
              </div>
              <span class="small" id="dealer-code-count">${codes.length} codes available</span>
            </label>
            <label>
              Installation Category
              <select name="installationCategory" required>
                <option value="FULL_CAR_PPF">Full Car PPF</option>
                <option value="PARTIAL_PPF">Partial PPF</option>
                <option value="WINDOW_FILM">Window Film</option>
                <option value="TPU_COLOR_PPF">TPU Color PPF</option>
                <option value="SPECIAL_FILM">Specialty Film</option>
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
          <h2>Available materials</h2>
          <p>Current catalog. HQ manages inventory quantity; dealer only sees exchange status and point cost.</p>
          <p>
            Current points: <strong>${dealer.points}</strong>.
            Frozen points: <strong>${frozen}</strong>.
            Available points: <strong>${available}</strong>.
          </p>
          <div class="reward-grid">
            ${data.rewards
              .map(
                (reward) => `
                  <article class="data-card reward-catalog-card">
                    <span class="badge">${escapeHtml(reward.category)}</span>
                    <h3>${escapeHtml(reward.name)}</h3>
                    <p>${reward.points} points per item</p>
                    ${statusBadge(reward.status)}
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="panel redemption-builder">
          <h2>Select materials for this request</h2>
          <p>Enter quantities below. The system will calculate line totals and submit the whole request to HQ for review.</p>
          <form data-form="redemption-request">
            <div class="redemption-layout">
              <div class="table-wrap redemption-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Status</th>
                      <th>Unit points</th>
                      <th>Quantity</th>
                      <th>Line total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.rewards
                      .map((reward) => {
                        const isAvailable = reward.status === "Available for Redemption";
                        return `
                          <tr class="${isAvailable ? "" : "is-muted"}">
                            <td>
                              <strong>${escapeHtml(reward.name)}</strong>
                              <span>${escapeHtml(reward.category)}</span>
                            </td>
                            <td>${statusBadge(reward.status)}</td>
                            <td>${reward.points} points</td>
                            <td>
                              <input
                                class="quantity-input"
                                data-reward-qty
                                data-reward-id="${escapeHtml(reward.id)}"
                                name="qty-${escapeHtml(reward.id)}"
                                type="number"
                                min="0"
                                max="99"
                                step="1"
                                value="0"
                                ${isAvailable ? "" : "disabled"}
                              />
                            </td>
                            <td><strong data-line-total="${escapeHtml(reward.id)}">0 points</strong></td>
                          </tr>
                        `;
                      })
                      .join("")}
                  </tbody>
                </table>
              </div>
              <aside class="redemption-summary" data-redemption-summary data-available="${available}">
                <h3>Request summary</h3>
                <ul data-redemption-lines>
                  <li>No materials selected yet.</li>
                </ul>
                <div class="redemption-total">
                  <span>Total points</span>
                  <strong><span data-redemption-total>0</span></strong>
                </div>
                <p class="small" data-redemption-warning>Select materials and quantities to calculate points.</p>
                <button class="button" data-redemption-submit type="submit" disabled>Submit Redemption Request</button>
              </aside>
            </div>
          </form>
        </section>

        <section class="panel">
          <h2>Redemption history</h2>
          <p>Track HQ review progress and previous material requests.</p>
          ${redemptionsTable(false, dealer.code)}
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
          <h3>Sign In</h3>
          <label>Account name<input name="email" placeholder="Your admin account" required /></label>
          <label>Password<input name="password" type="password" placeholder="Your password" required /></label>
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
          <p>Products define default warranty years, usage type, and usage limit. Add, edit, or manage products that will be selectable during warranty registration.</p>
        </section>
        <section class="panel">
          <h3>Add / Edit Product</h3>
          <div class="form-grid">
            <label>Product Type <select id="admin-product-type" data-action="admin-product-type">
              <option value="PPF">PPF (Paint Protection Film)</option>
              <option value="WINDOW_FILM">Window Film</option>
              <option value="TPU_COLOR_PPF">TPU Color PPF</option>
              <option value="SPECIAL_FILM">Specialty Film</option>
              <option value="MANUAL_PARTIAL">Manual / Partial</option>
            </select></label>
            <label>Product Name <input id="admin-product-name" placeholder="e.g. HEHE PPF Classic 190" /></label>
            <label>External Model <input id="admin-product-external" placeholder="e.g. HH Classic 190" /></label>
            <label>Warranty Years <input id="admin-product-years" type="number" min="1" max="15" value="5" placeholder="5" /></label>
            <label>Usage Type <select id="admin-product-usage">
              <option value="Single">Single</option>
              <option value="Multi">Multi</option>
            </select></label>
            <label>Default Usage Limit <input id="admin-product-limit" type="number" min="1" max="999" value="1" /></label>
            <label>Status <select id="admin-product-status">
              <option value="Active">Active</option>
              <option value="Reserved">Reserved</option>
            </select></label>
            <label class="full">Remark <input id="admin-product-remark" placeholder="Brief product description" /></label>
          </div>
          <div class="inline-actions" style="margin-top:18px;">
            <button class="button" data-action="admin-product-save">Save Product</button>
            <button class="ghost-button" data-action="admin-product-reset">Reset Form</button>
          </div>
          <input type="hidden" id="admin-product-edit-id" />
        </section>
        <section class="panel">
          <h3>Product Catalog (${data.products.length})</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Type</th><th>Name</th><th>External</th><th>Years</th><th>Usage</th><th>Limit</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                ${data.products
                  .map(
                    (product, idx) => `
                      <tr>
                        <td>${escapeHtml(productLabel(product.type))}</td>
                        <td><strong>${escapeHtml(product.name)}</strong></td>
                        <td>${escapeHtml(product.externalModel || "-")}</td>
                        <td>${escapeHtml(product.warrantyYears)}</td>
                        <td>${escapeHtml(product.usageType)}</td>
                        <td>${escapeHtml(product.defaultUsageLimit)}</td>
                        <td>${statusBadge(product.status)}</td>
                        <td>
                          <button class="text-button" data-action="admin-product-edit" data-idx="${idx}">Edit</button>
                          ${product.type !== "MANUAL_PARTIAL" ? `<button class="danger-button text-button" data-action="admin-product-delete" data-idx="${idx}" style="color:var(--red);">Delete</button>` : ""}
                        </td>
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

  function handleAdminProductSave() {
    const idField = document.getElementById("admin-product-edit-id");
    const editIdx = idField.value !== "" ? parseInt(idField.value, 10) : -1;
    const product = {
      type: document.getElementById("admin-product-type").value,
      name: document.getElementById("admin-product-name").value.trim(),
      externalModel: document.getElementById("admin-product-external").value.trim(),
      warrantyYears: parseInt(document.getElementById("admin-product-years").value, 10) || 5,
      usageType: document.getElementById("admin-product-usage").value,
      defaultUsageLimit: parseInt(document.getElementById("admin-product-limit").value, 10) || 1,
      status: document.getElementById("admin-product-status").value,
      remark: document.getElementById("admin-product-remark").value.trim(),
    };
    if (!product.name) { alert(translateValue("Product name is required.")); return; }
    if (editIdx >= 0 && editIdx < data.products.length) {
      data.products[editIdx] = product;
    } else {
      data.products.push(product);
    }
    saveData();
    renderPage("admin/products");
  }

  function handleAdminProductEdit(idx) {
    const product = data.products[idx];
    if (!product) return;
    document.getElementById("admin-product-edit-id").value = idx;
    document.getElementById("admin-product-type").value = product.type;
    document.getElementById("admin-product-name").value = product.name || "";
    document.getElementById("admin-product-external").value = product.externalModel || "";
    document.getElementById("admin-product-years").value = product.warrantyYears;
    document.getElementById("admin-product-usage").value = product.usageType;
    document.getElementById("admin-product-limit").value = product.defaultUsageLimit;
    document.getElementById("admin-product-status").value = product.status;
    document.getElementById("admin-product-remark").value = product.remark || "";
    const saveBtn = document.querySelector("[data-action='admin-product-save']");
    if (saveBtn) saveBtn.textContent = "Update Product";
  }

  function handleAdminProductDelete(idx) {
    if (!confirm(translateValue("Delete this product? This cannot be undone."))) return;
    data.products.splice(idx, 1);
    saveData();
    renderPage("admin/products");
  }

  function handleAdminProductReset() {
    document.getElementById("admin-product-edit-id").value = "";
    document.getElementById("admin-product-name").value = "";
    document.getElementById("admin-product-external").value = "";
    document.getElementById("admin-product-years").value = "5";
    document.getElementById("admin-product-usage").value = "Single";
    document.getElementById("admin-product-limit").value = "1";
    document.getElementById("admin-product-status").value = "Active";
    document.getElementById("admin-product-remark").value = "";
    const saveBtn = document.querySelector("[data-action='admin-product-save']");
    if (saveBtn) saveBtn.textContent = "Save Product";
  }

  function renderAdminDealers() {
    return adminShell(
      "admin/dealers",
      `
        <section class="panel">
          <h2>Dealer Management</h2>
          <p>Create and manage dealer accounts. Each dealer will use the assigned username and password to log into the Dealer Portal.</p>
        </section>
        <section class="panel">
          <h3>Create / Edit Dealer</h3>
          <div class="form-grid">
            <label>Dealer Code <input id="admin-dealer-code" placeholder="e.g. RU-MSK-001" /></label>
            <label>Dealer Name <input id="admin-dealer-name" placeholder="e.g. Moscow Auto Studio" /></label>
            <label>Username <input id="admin-dealer-username" placeholder="Login username" /></label>
            <label>Password <input id="admin-dealer-password" type="text" placeholder="Login password" /></label>
            <label>Country <input id="admin-dealer-country" placeholder="e.g. Russia" /></label>
            <label>City <input id="admin-dealer-city" placeholder="e.g. Moscow" /></label>
            <label>Level <select id="admin-dealer-level">
              <option value="Country Partner">Country Partner</option>
              <option value="Regional Dealer">Regional Dealer</option>
              <option value="City Dealer">City Dealer</option>
              <option value="Shop">Shop</option>
            </select></label>
            <label>Parent Dealer <select id="admin-dealer-parent">
              <option value="HQ">HQ</option>
              ${data.dealers.map((d) => `<option value="${d.code}">${d.code} - ${d.name}</option>`).join("")}
            </select></label>
            <label>Status <select id="admin-dealer-status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select></label>
          </div>
          <div class="inline-actions" style="margin-top:18px;">
            <button class="button" data-action="admin-dealer-save">Save Dealer</button>
            <button class="ghost-button" data-action="admin-dealer-reset">Reset Form</button>
          </div>
          <input type="hidden" id="admin-dealer-edit-idx" />
        </section>
        <section class="panel">
          <h3>Dealer List (${data.dealers.length})</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Code</th><th>Username</th><th>Name</th><th>Country</th><th>City</th><th>Level</th><th>Parent</th><th>Points</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                ${data.dealers
                  .map(
                    (dealer, idx) => `
                      <tr>
                        <td><strong>${escapeHtml(dealer.code)}</strong></td>
                        <td>${escapeHtml(dealer.username || "-")}</td>
                        <td>${escapeHtml(dealer.name)}</td>
                        <td>${escapeHtml(dealer.country)}</td>
                        <td>${escapeHtml(dealer.city)}</td>
                        <td>${escapeHtml(dealer.level)}</td>
                        <td>${escapeHtml(dealer.parentCode)}</td>
                        <td>${escapeHtml(dealer.points)}</td>
                        <td>${statusBadge(dealer.status)}</td>
                        <td>
                          <button class="text-button" data-action="admin-dealer-edit" data-idx="${idx}">Edit</button>
                          <button class="text-button danger-button" data-action="admin-dealer-delete" data-idx="${idx}" style="color:var(--red);">Delete</button>
                        </td>
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

  function handleAdminDealerSave() {
    const idField = document.getElementById("admin-dealer-edit-idx");
    const editIdx = idField.value !== "" ? parseInt(idField.value, 10) : -1;
    const code = document.getElementById("admin-dealer-code").value.trim();
    const username = document.getElementById("admin-dealer-username").value.trim();
    const password = document.getElementById("admin-dealer-password").value.trim();
    const name = document.getElementById("admin-dealer-name").value.trim();
    if (!code) { alert(translateValue("Dealer code is required.")); return; }
    if (!username) { alert(translateValue("Username is required for login.")); return; }
    if (!name) { alert(translateValue("Dealer name is required.")); return; }
    if (editIdx < 0 && !password) { alert(translateValue("Password is required for new dealer.")); return; }
    const existing = data.dealers.find((d) => d.code === code);
    if (existing && (editIdx < 0 || existing !== data.dealers[editIdx])) {
      alert(translateValue("Dealer code already exists. Use a unique code."));
      return;
    }
    const dealer = {
      code,
      username,
      name,
      country: document.getElementById("admin-dealer-country").value.trim(),
      city: document.getElementById("admin-dealer-city").value.trim(),
      level: document.getElementById("admin-dealer-level").value,
      parentCode: document.getElementById("admin-dealer-parent").value,
      status: document.getElementById("admin-dealer-status").value,
      points: editIdx >= 0 && data.dealers[editIdx] ? data.dealers[editIdx].points : 0,
    };
    if (password) dealer.password = password;
    else if (editIdx >= 0 && data.dealers[editIdx]) dealer.password = data.dealers[editIdx].password;
    if (editIdx >= 0 && editIdx < data.dealers.length) {
      data.dealers[editIdx] = dealer;
    } else {
      data.dealers.push(dealer);
    }
    saveData();
    renderPage("admin/dealers");
  }

  function handleAdminDealerEdit(idx) {
    const dealer = data.dealers[idx];
    if (!dealer) return;
    document.getElementById("admin-dealer-edit-idx").value = idx;
    document.getElementById("admin-dealer-code").value = dealer.code || "";
    document.getElementById("admin-dealer-name").value = dealer.name || "";
    document.getElementById("admin-dealer-username").value = dealer.username || "";
    document.getElementById("admin-dealer-password").value = "";
    document.getElementById("admin-dealer-country").value = dealer.country || "";
    document.getElementById("admin-dealer-city").value = dealer.city || "";
    document.getElementById("admin-dealer-level").value = dealer.level || "Country Partner";
    document.getElementById("admin-dealer-parent").value = dealer.parentCode || "HQ";
    document.getElementById("admin-dealer-status").value = dealer.status || "Active";
    const saveBtn = document.querySelector("[data-action='admin-dealer-save']");
    if (saveBtn) saveBtn.textContent = "Update Dealer";
  }

  function handleAdminDealerDelete(idx) {
    if (!confirm(translateValue("Delete this dealer? Warranty codes and records associated with this dealer will be preserved but the account will no longer be accessible. Continue?"))) return;
    data.dealers.splice(idx, 1);
    saveData();
    renderPage("admin/dealers");
  }

  function handleAdminDealerReset() {
    document.getElementById("admin-dealer-edit-idx").value = "";
    document.getElementById("admin-dealer-code").value = "";
    document.getElementById("admin-dealer-name").value = "";
    document.getElementById("admin-dealer-username").value = "";
    document.getElementById("admin-dealer-password").value = "";
    document.getElementById("admin-dealer-country").value = "";
    document.getElementById("admin-dealer-city").value = "";
    document.getElementById("admin-dealer-level").value = "Country Partner";
    document.getElementById("admin-dealer-parent").value = "HQ";
    document.getElementById("admin-dealer-status").value = "Active";
    const saveBtn = document.querySelector("[data-action='admin-dealer-save']");
    if (saveBtn) saveBtn.textContent = "Save Dealer";
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

  function redemptionsTable(withActions, dealerCode = "") {
    const rows = dealerCode ? data.redemptions.filter((item) => item.dealerCode === dealerCode) : data.redemptions;
    if (!rows.length) return `<p class="notice">No redemption requests yet.</p>`;
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Dealer</th><th>Materials</th><th>Qty</th><th>Total points</th><th>Status</th><th>Remark</th>${withActions ? "<th>Action</th>" : ""}</tr></thead>
          <tbody>
            ${rows
              .map(
                (item) => `
                  <tr>
                    <td>${escapeHtml(item.id)}</td>
                    <td>${escapeHtml(item.dealerName)}</td>
                    <td>${escapeHtml(redemptionRewardLabel(item))}</td>
                    <td>${escapeHtml(redemptionTotalQuantity(item))}</td>
                    <td>${escapeHtml(redemptionTotalPoints(item))}</td>
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
        ${workspace ? "" : renderFooter(route)}
        ${ui.toast ? `<div class="toast">${escapeHtml(ui.toast)}</div>` : ""}
      </div>
    `;
    localizeRenderedPage();
    if (route === "dealer/register-warranty") initCodeCombobox();
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
    ui.toast = translateValue(message);
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
    if (target.matches("[data-reward-qty]")) {
      updateRedemptionSummary();
      return;
    }
    if (target.id === "dealer-code-select") {
      const summary = document.getElementById("dealer-code-summary");
      const code = codeByValue(target.value);
      if (summary && code) summary.innerHTML = renderCodeSummary(code);
    }
  });

  /* ── Warranty Code Combobox (manual input + fuzzy search) ── */
  function fuzzyMatchCodes(query, codes) {
    if (!query) return codes;
    const q = query.toLowerCase();
    return codes
      .map((code) => {
        const text = (code.code + " " + productLabel(code.productType)).toLowerCase();
        let score = 0;
        if (text === q) score = 1000;
        else if (text.startsWith(q)) score = 500;
        else if (text.includes(q)) score = 200;
        else {
          let qi = 0;
          for (let ti = 0; ti < text.length && qi < q.length; ti++) {
            if (text[ti] === q[qi]) qi++;
          }
          if (qi === q.length) score = 50;
        }
        return { code, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.code);
  }

  function initCodeCombobox() {
    const dealer = activeDealer();
    const allCodes = availableCodesForDealer(dealer.code);
    const input = document.getElementById("dealer-code-input");
    const valueInput = document.getElementById("dealer-code-value");
    const dropdown = document.getElementById("dealer-code-dropdown");
    const summary = document.getElementById("dealer-code-summary");
    const countEl = document.getElementById("dealer-code-count");
    if (!input || !dropdown) return;

    function showMatches(query) {
      const matches = fuzzyMatchCodes(query, allCodes);
      if (countEl) countEl.textContent = matches.length + " codes available";
      if (matches.length === 0) {
        dropdown.innerHTML = '<div class="code-combobox-item is-empty">No matching codes</div>';
      } else {
        dropdown.innerHTML = matches
          .map(
            (code, i) =>
              `<div class="code-combobox-item${i === 0 ? " is-active" : ""}" data-code="${escapeHtml(code.code)}">
                <strong>${escapeHtml(code.code)}</strong>
                <span>${escapeHtml(productLabel(code.productType))}</span>
              </div>`,
          )
          .join("");
      }
      dropdown.style.display = "block";
    }

    function selectCode(codeObj) {
      input.value = codeObj.code;
      if (valueInput) valueInput.value = codeObj.code;
      dropdown.style.display = "none";
      if (summary) summary.innerHTML = renderCodeSummary(codeObj);
    }

    input.addEventListener("input", () => showMatches(input.value.trim()));
    input.addEventListener("focus", () => showMatches(input.value.trim()));

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { dropdown.style.display = "none"; return; }
      if (e.key === "Enter") {
        e.preventDefault();
        const active = dropdown.querySelector(".is-active");
        if (active && !active.classList.contains("is-empty")) {
          const code = codeByValue(active.dataset.code);
          if (code) selectCode(code);
        }
        dropdown.style.display = "none";
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = [...dropdown.querySelectorAll(".code-combobox-item:not(.is-empty)")];
        if (items.length === 0) return;
        const active = dropdown.querySelector(".is-active");
        let idx = active ? items.indexOf(active) : -1;
        if (e.key === "ArrowDown") idx = (idx + 1) % items.length;
        else idx = (idx - 1 + items.length) % items.length;
        items.forEach((i) => i.classList.remove("is-active"));
        items[idx].classList.add("is-active");
        items[idx].scrollIntoView({ block: "nearest" });
      }
    });

    dropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".code-combobox-item");
      if (!item || item.classList.contains("is-empty")) return;
      const code = codeByValue(item.dataset.code);
      if (code) selectCode(code);
    });

    document.addEventListener("click", function hideDropdown(e) {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    }, true);

    if (allCodes.length > 0) selectCode(allCodes[0]);
  }

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("[data-reward-qty]")) {
      updateRedemptionSummary();
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
    if (formType === "redemption-request") handleRedemptionRequest(form);
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
    if (action === "admin-product-save") handleAdminProductSave();
    if (action === "admin-product-reset") handleAdminProductReset();
    if (action === "admin-product-edit") handleAdminProductEdit(parseInt(target.getAttribute("data-idx"), 10));
    if (action === "admin-product-delete") handleAdminProductDelete(parseInt(target.getAttribute("data-idx"), 10));
    if (action === "admin-dealer-save") handleAdminDealerSave();
    if (action === "admin-dealer-reset") handleAdminDealerReset();
    if (action === "admin-dealer-edit") handleAdminDealerEdit(parseInt(target.getAttribute("data-idx"), 10));
    if (action === "admin-dealer-delete") handleAdminDealerDelete(parseInt(target.getAttribute("data-idx"), 10));
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

  function selectedRedemptionItems(form) {
    return [...form.querySelectorAll("[data-reward-qty]")]
      .map((input) => {
        const reward = data.rewards.find((item) => item.id === input.getAttribute("data-reward-id"));
        const quantity = Math.max(0, Math.min(99, Math.floor(Number(input.value || 0))));
        if (!reward || reward.status !== "Available for Redemption") return null;
        const lineTotal = reward.points * quantity;
        const lineTotalElement = form.querySelector(`[data-line-total="${reward.id}"]`);
        if (lineTotalElement) lineTotalElement.textContent = `${lineTotal} ${translateValue("points")}`;
        if (!quantity) return null;
        return {
          rewardId: reward.id,
          rewardName: reward.name,
          points: reward.points,
          quantity,
        };
      })
      .filter(Boolean);
  }

  function updateRedemptionSummary() {
    const form = document.querySelector('[data-form="redemption-request"]');
    if (!form) return;
    const summary = form.querySelector("[data-redemption-summary]");
    if (!summary) return;
    const available = Number(summary.getAttribute("data-available") || 0);
    const items = selectedRedemptionItems(form);
    const total = items.reduce((sum, item) => sum + item.points * item.quantity, 0);
    const lines = summary.querySelector("[data-redemption-lines]");
    const totalNode = summary.querySelector("[data-redemption-total]");
    const warning = summary.querySelector("[data-redemption-warning]");
    const submit = summary.querySelector("[data-redemption-submit]");
    if (lines) {
      lines.innerHTML = items.length
        ? items
            .map(
              (item) =>
                `<li>${escapeHtml(item.rewardName)} x ${item.quantity} = ${item.points * item.quantity} ${escapeHtml(translateValue("points"))}</li>`,
            )
            .join("")
        : `<li>${escapeHtml(translateValue("No materials selected yet."))}</li>`;
    }
    if (totalNode) totalNode.textContent = String(total);
    const overBalance = total > available;
    if (warning) {
      warning.textContent = overBalance
        ? translateValue("Selected total exceeds available points.")
        : items.length
          ? translateValue("Ready to submit for HQ review.")
          : translateValue("Select materials and quantities to calculate points.");
    }
    if (submit) submit.disabled = !items.length || overBalance;
  }

  function handleRedemptionRequest(form) {
    const dealer = activeDealer();
    const available = dealer.points - frozenPointsForDealer(dealer.code);
    const items = selectedRedemptionItems(form);
    const total = items.reduce((sum, item) => sum + item.points * item.quantity, 0);
    if (!items.length) {
      showToast("Please select at least one material before submitting.");
      return;
    }
    if (total > available) {
      showToast("Selected materials exceed available points.");
      return;
    }
    data.redemptions.unshift({
      id: `RD-${new Date().getFullYear()}-${String(data.redemptions.length + 1).padStart(4, "0")}`,
      dealerCode: dealer.code,
      dealerName: dealer.name,
      rewardId: items.length === 1 ? items[0].rewardId : "MULTI",
      rewardName: items.map((item) => item.rewardName).join(" / "),
      points: total,
      quantity: items.reduce((sum, item) => sum + item.quantity, 0),
      items,
      status: "Pending Review",
      remark: "Pending HQ review. Points are frozen until review.",
      time: nowLabel(),
    });
    saveData();
    showToast("Redemption request submitted to HQ for review.");
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
      dealer.points -= redemptionTotalPoints(redemption);
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
        productName: "HEHE PPF Pro 210",
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
      productName: "HEHE PPF Pro 210",
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
    downloadCsv(
      "hh-redemption-requests.csv",
      data.redemptions.map((item) => ({
        id: item.id,
        dealerCode: item.dealerCode,
        dealerName: item.dealerName,
        materials: redemptionRewardLabel(item),
        quantity: redemptionTotalQuantity(item),
        totalPoints: redemptionTotalPoints(item),
        status: item.status,
        remark: item.remark,
        time: item.time,
      })),
    );
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
