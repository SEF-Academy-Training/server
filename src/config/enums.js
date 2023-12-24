exports.enum_BlogsCategory = [
	'tech',
	'business',
	'security',
	'sports',
	'medical',
	'startups',
	'about',
];
exports.enum_ServiceCategory = [
	'tax services & consultations',
	'auditing & assurance',
	'bookkeeping',
	'social insurance',
	'training workshops',
	'investment & incorporation',
];
exports.enum_ServiceStatus = ['pending', 'ongoing', 'completed'];

exports.enum_paperStatus = ['unread', 'valid', 'not valid'];
exports.enum_PaperTypes = ['personal', 'company'];
exports.enum_PaperDocs = [
	//personal papers
	'personal ID',
	'commercial register',
	'tax card',
	'establishment contract',
	// company papers
	'VAT',
	'withhold tax',
	'payroll tax',
	'annual income',
	'annual balance',
];

exports.initialOurServices = [
	{
		// _id: '510srv',
		title: 'tax services & consultations',
		titleAr: 'تقديم الخدمات الضريبية والاستشارات',
		type: 'personal',
		requiredPapers: ['1110', '1112', '1113'],
		cover: '/ourServices/Tax-Services-&-Consultations.png',
		description:
			'We provide you with a wide range of service in the fields of audit, assurance, accountin taxation, investment, and incorporation of new companies with a competitive fee.',
	},
	{
		// _id: '511srv',
		title: 'social insurance',
		titleAr: 'التأمين الاجتماعي',
		type: 'personal',
		requiredPapers: ['1110', '1112', '1113'],
		cover: '/ourServices/Social-Insurance.png',
		description:
			'handles all aspects of social insurance applications and resolves any problems or disputes',
	},
	{
		// _id: '512srv',
		title: 'training workshops',
		titleAr: 'التدريب وورش العمل',
		type: 'personal',
		requiredPapers: ['1110', '1113'],
		cover: '/ourServices/training-workshops.png',
		description:
			'provides training workshops for companies and corporations to improve their team quality and skills required to unlock sucess..',
	},
	{
		// _id: '513srv',
		title: 'auditing & assurance',
		titleAr: 'التدقيق والضمان',
		type: 'company',
		requiredPapers: ['1115', '1117', '1118'],
		cover: '/ourServices/Auditing-&-Assurance.png',
		description:
			'provides its tax services in this area on the basis of the specialization principle. Accordingly, each partner and his group provide a specific tax service.',
	},
	{
		// _id: '514srv',
		title: 'bookkeeping',
		titleAr: 'إعداد السجلات المحاسبية',
		type: 'company',
		requiredPapers: ['1115', '1117', '1118'],
		cover: '/ourServices/Bookkeeping.png',
		description:
			'Our Auditing and Assurance service provides insight on the current state of firms, exploring the legitimacy of firms’ financial statements and providing assurance to investors and capital markets.',
	},

	{
		// _id: '515srv',
		title: 'investment & incorporation',
		titleAr: 'الاستثمار والتأسيس',
		type: 'company',
		requiredPapers: ['1115', '1116', '1117', '1118', '1119'],
		cover: '/ourServices/Investment-&-Incorporation.png',
		description:
			'provides daily recording of a company’s financial transactions into organized accounts to keep up to date of your financial transactions..',
	},
];
