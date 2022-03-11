var lst = [
	{v: 'ceo', l: 'Управление процессами', help: 'Организация, контроль, оптимизация и оценка эффективности бизнес-процессов'},
	//{v: 'coo', l: 'Операционная работа', help: ''},
	{v: 'chro', l: 'Работа с персоналом', help: 'Подбор, учет, продвижение, профориентация и переподготовка персонала.'},
	{v: 'cio', l: 'Информационные технологии', help: 'Программное и аппаратное обеспечение. Компьютеры и комплектующие. Интернет. Гаджеты.'},
	{v: 'cto', l: 'Инженерные технологии', help: 'Технологические процессы. Машиностроение. Проектирование и запуск оборудования.'},
	{v: 'cmo', l: 'Маркетинг', help: 'Продвижение товаров и услуг. Брендинг. Дизайн.'},
	{v: 'clo', l: 'Юриспруденция', help: 'Закон. Право. Юридические услуги.'},
	{v: 'cpa', l: 'Бухгалтерия', help: 'Учет деятельности организации. Налогообложение.'},
	{v: 'niokr', l: 'НИОКР', help: 'Научно-исследовательские и опытно-конструкторские работы. Создание новых изделий и технологий.'},
	{v: 'crmo', l: 'Риск-менеджмент', help: 'Управление бизнес-рисками.'},
	{v: 'time', l: 'Тайм-менеджмент', help: 'Организация времени и оценка эффективности его использования.'},
	{v: 'cso', l: 'Безопасность', help: 'Безопасность жизнедеятельности. Борьба с организованной преступностью и тетторизмом.'},
	{v: 'cspo', l: 'Планирование', help: 'Стратегическое и тактическое распределение ресурсов и усилий. Прогнозирование результатов.'},
	{v: 'business', l: 'Бизнес', help: 'Малый и средний бизнес. Индивидуальное предпринимательство. Социальные и некоммерческие проекты.'},
	{v: 'charity', l: 'Благотворительность', help: 'Безвозмездные пожертвования. Помощь нуждающимся, социально незащищенным группам граждан.'},
	{v: 'logistics', l: 'Логистика', help: 'Управление материальными, информационными и людскими потоками.'},
	{v: 'politica', l: 'Политика', help: 'Государственная и общественная деятельность. Политические партии. Международные отношения.'},
	{v: 'sociology', l: 'Социалогия', help: 'Изучение общественного мнения.'},
	{v: 'economy', l: 'Экономика', help: 'Микро-экономика. Государственный бюджет. Благосостояние население.'},
	{v: 'macro_economy', l: 'Макро-экономика', help: 'Мировая торговля. Экономика государств. Транснациональные корпорации.'},
	{v: 'psychology', l: 'Психология', help: 'Психика и психическая деятельность человека и групп людей.'},
	{v: 'education', l: 'Образование', help: 'Воспитание и обучение граждан. Просвещение.'},
	{v: 'sport', l: 'Спорт', help: 'Физическая культура. Спортивные мероприятия.'},
	{v: 'medicine', l: 'Медицина', help: 'Здравоохранение. Научная деятельность в области медицины.'},
	{v: 'tourism', l: 'Туризм', help: 'Путешествия. Активный отдых.'},
	{v: 'zkh', l: 'Строительство и ЖКХ', help: 'Строительство и жилищно-коммунальное хозяйство.'},
	{v: 'culture', l: 'Культура', help: 'Удовлетворение духовных ценностей и деятельсности человека. Самовыражение и саморазвитие.'},
	{v: 'transport', l: 'Транспорт', help: 'Перевозки пассажиров и грузов. Транспортные средства и инфраструктура.'},
	{v: 'smi', l: 'СМИ', help: 'Средства массовой информации.'},
	{v: 'sh', l: 'Сельское хозяйство', help: 'Коммерческое и научное животноводство и растениеводство. Продовольственная безопасность.'},
	{v: 'energy', l: 'Энергетика', help: 'Выработка и передача энергии. Природные источники энергии. Атомная и возобновляемая энергетика.'},
	{v: 'ecology', l: 'Экология', help: 'Изучение и защита природы. Охрана окружающей среды.'},
	{v: 'religion', l: 'Религия', help: 'Почитание и вера в сверхъестественное. Церковь. Мировые религии. Атеизм.'},
	{v: 'philosophy', l: 'Философия', help: 'Теория познания мира.'},
	{v: 'history', l: 'История', help: 'Изучение развития человеческого общества в прошлом.'},
];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.stats = lst;

/*

CAE (chief audit executive) — директор по аудиту (внутреннему).

CAO (chief administrative officer | chief analytics officer) — директор по административным вопросам | главный аналитик

CBO, CBDO (chief business officer, chief business development officer) — директор по развитию бизнеса

CCO (chief commercial officer | chief compliance officer) — коммерческий директор | директор по согласовательным и исполнительным процедурам

CEO (chief executive officer) — генеральный директор (компании); главное должностное лицо (компании)

CDO (chief data officer) — директор по управлению данными компании

CFO (chief financial officer) — финансовый директор (компании)

CFS (credit file supervisor) — старший кредитный инспектор

CHRO (chief human resources officer ) — руководитель службы персонала

CIO (chief information officer) — директор по информационным технологиям

CKO (chief knowledge officer) — директор по управлению интеллектуальными ресурсами

CLO (chief legal officer) — главный юрисконсульт; руководитель юридического подразделения

СМО (chief marketing officer) — директор по маркетингу

COO (chief operating officer) — главный инженер (на предприятии); должностное лицо компании, отвечающее за текущую деятельность

CPA (certified public accountant) — дипломированный бухгалтер; присяжный бухгалтер; дипломированный бухгалтер-аудитор

CPC (chief professional consultant) — главный специалист-консультант

CPO (chief procurement officer | chief product officer) — директор по закупкам | директор по производству

CQO (chief quality officer) — директор по качеству продукции

CRO (сhief research officer) — директор по научным исследованиям; научный руководитель

CRMO (chief risk management officer) — директор по управлению рисками; главный риск-менеджер

CSO (chief security officer) — директор по обеспечению безопасности бизнеса; начальник службы безопасности

CSPO (chief strategic planning officer) — директор по стратегическому развитию

CTL (country team leader) — заведующий территориальным отделом (в международных финансовых организациях)

CTO (chief technical officer) — главный инженер; технический директор

CSA (chief software architect) — главный архитектор программного обеспечения

EAM (external asset manager) — независимый распорядитель активами; внешний распорядитель активами

ED (executive director) — исполнительный директор

OFS (operations file supervisor) — администратор проектов; кредитный инспектор

OL (operation leader) — руководитель группы по разработке проекта; руководитель операции; руководитель проекта; руководитель проектной группы

STL (sector team leader) — заведующий отраслевым отделом (в международных финансовых организациях)

SVP (senior vice-president) — первый вице-президент

TL (team leader) — заведующий отделом (в международных финансовых организациях)

VP  (vice president) — вице-президент

*/