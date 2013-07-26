<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:output method="xml"
            indent="yes"
            encoding="utf-8"
            omit-xml-declaration="no" />

<xsl:template match='@* | node()'>
    <xsl:copy>
        <xsl:apply-templates select='@* | node()' />
    </xsl:copy>
</xsl:template>

<xsl:template match='json2xml'>
	<xsl:copy>
		<!--<xsl:element name='input'>-->
		<!--	<xsl:copy-of select='*' />-->
		<!--</xsl:element>-->
		<xsl:element name='data'>
			<xsl:apply-templates select='./data' />
		</xsl:element>
	</xsl:copy>
</xsl:template>

<xsl:template match='data'>
    <!--<xsl:apply-templates select='*' />-->
	<xsl:for-each select='*'>
		<xsl:apply-templates select='.' mode='xidok' />
	</xsl:for-each>
</xsl:template>

<xsl:template match='*' mode='xidok'>
	<xsl:element name='datum'>
		<xsl:element name='xid'>
			<xsl:value-of select='./xid' />
		</xsl:element>
		<xsl:element name='name'>
			<xsl:value-of select='./name' />
		</xsl:element>
		<xsl:element name='result'>
			<xsl:text>ok</xsl:text>
		</xsl:element>
	</xsl:element>
</xsl:template>

<!--<xsl:template match='root'>-->
<!--    <xsl:apply-templates select='//element[@element_type="root"]' />-->
<!--</xsl:template>-->
<!---->
<!--<xsl:template match='element'>-->
<!--    <xsl:element name='{@element_name}'>-->
<!--        <xsl:apply-templates select='@element_id' />-->
<!--        <xsl:apply-templates select='//element[@parent_id=current()/@element_id and @element_type="attribute"]' />-->
<!--        <xsl:apply-templates select='//element[@parent_id=current()/@element_id and @element_type="node"]' />-->
<!--        <xsl:value-of select='@element_value' />-->
<!--    </xsl:element>-->
<!--</xsl:template>-->
<!---->
<!--<xsl:template match='element[@element_type="attribute"]'>-->
<!--    <xsl:attribute name='{@element_name}'>-->
<!--        <xsl:value-of select='@element_value' />-->
<!--    </xsl:attribute>-->
<!--</xsl:template>-->
 
</xsl:stylesheet>
