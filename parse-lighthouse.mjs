import fs from 'fs';

try {
    const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));
    const categories = report.categories;

    console.log('--- Lighthouse Scores ---');
    for (const [id, category] of Object.entries(categories)) {
        console.log(`${category.title}: ${Math.round(category.score * 100)}`);
    }

    console.log('\n--- Key Metrics ---');
    const audits = report.audits;
    const metrics = [
        'first-contentful-paint',
        'largest-contentful-paint',
        'total-blocking-time',
        'cumulative-layout-shift',
        'speed-index'
    ];

    metrics.forEach(id => {
        if (audits[id]) {
            console.log(`${audits[id].title}: ${audits[id].displayValue}`);
        }
    });

    console.log('\n--- Diagnostics ---');
    if (audits['mainthread-work-breakdown']) {
        console.log('Main Thread Work Breakdown:');
        // Sort by duration desc
        const items = audits['mainthread-work-breakdown'].details.items.sort((a, b) => b.duration - a.duration);
        items.forEach(item => {
            if (item.duration > 50) console.log(`  ${item.groupLabel}: ${Math.round(item.duration)}ms`);
        });
    }
    if (audits['bootup-time']) {
        console.log('\nJavaScript Execution Time:');
        const items = audits['bootup-time'].details.items.sort((a, b) => b.total - a.total);
        items.forEach(item => {
            if (item.total > 50) console.log(`  ${item.url}: ${Math.round(item.total)}ms`);
        });
    }

} catch (e) {
    console.error('Error parsing report:', e);
}
